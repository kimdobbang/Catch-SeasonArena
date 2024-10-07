from fastapi import FastAPI, UploadFile, File, Form
from typing import List
from ultralytics import YOLO
from PIL import Image
import io
import json
from fastapi.middleware.cors import CORSMiddleware
from confluent_kafka import Producer
import requests

app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://j11b106.p.ssafy.io"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["*"],
)

model = YOLO('./model.pt')

class_name_to_item_id = {
    'squirrel': 10,
    'dragonfly': 4,
    'maple': 1,
    'pumpkins': 2,
    'pinecone': 3,
    'mushroom': 8,
    'moon': 11
}

p = Producer({'bootstrap.servers': '3.36.122.163:9092'})

def delivery_report(err, msg):
    """ 전송 성공/실패 여부를 확인하는 콜백 함수 """
    if err is not None:
        print(f'Message delivery failed: {err}')
    else:
        print(f'Message delivered to {msg.topic()} [{msg.partition()}]')

def send_kafka_message(topic, value):
    """ Kafka 메시지 전송 """
    p.produce(topic, key=str(value.get("fileName", "key")), value=json.dumps(value), callback=delivery_report)
    p.poll(0)

base_api_url = "https://j11b106.p.ssafy.io/api/main/inventories/items"
with open('item.json', 'r', encoding='utf-8') as f:
    item_data = json.load(f)

@app.post("/api/ai/collections")
async def detect_objects(
    formData: List[UploadFile] = File(...),
    email: str = Form(...)
):
    detect_result = None
    highest_confidence = 0
    detectResult = None
    kafka_logs = [] 

    for file in formData:
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data))

        results = model.predict(image)

        for result in results:
            for box, conf, cls in zip(result.boxes.xyxy, result.boxes.conf, result.boxes.cls):
                if conf > highest_confidence and conf >= 0.8:
                    class_name = model.names[int(cls)]
                    if class_name in class_name_to_item_id:
                        highest_confidence = conf
                        detectResult = {
                            "fileName": file.filename,
                            "xmin": int(box[0]),
                            "ymin": int(box[1]),
                            "xmax": int(box[2]),
                            "ymax": int(box[3]),
                            "confidence": float(conf),
                            "itemId": class_name_to_item_id[class_name]
                        }
                     
                        kafka_logs.append({
                            "class_name": class_name,
                            "confidence": float(conf),
                            "fileName": file.filename,
                            "server": "AI_SERVER" 
                        })

    if kafka_logs:
        for log in kafka_logs:
            send_kafka_message('ai-log', log)

    if detectResult:
        itemId = detectResult["itemId"]

        if itemId in item_data:
            item_info = item_data[str(itemId)]
            processed_result = {
                "name": item_info['name'],
                "itemId": itemId,
                "type": item_info['type'],
                "grade": item_info['grade'],
                "effect": item_info['effect'],
            }
            response_data = {
                "status": "success",
                "data": {
                    "processed_result": processed_result,
                    "detect_result": detectResult
                }
            }

            final_api_url = f"{base_api_url}/{itemId}/{email}"
            payload = {"detectResult": detectResult}
            requests.post(final_api_url, json=payload)

            return response_data
        else:
            return {"status": "failure", "message": "Item not found in local data"}

    else:
        send_kafka_message('ai-log', {
            "message": "No detection",
            "email": email,
            "server": "AI_SERVER" 
        })
        return {"status": "failure", "message": "No detection"}
