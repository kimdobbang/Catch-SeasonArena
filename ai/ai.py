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

# CORS 설정
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

# YOLOv8 모델 로드
model = YOLO('./model.pt')

# 클래스 이름과 itemId의 매핑
class_name_to_item_id = {
    'squirrel': 10,
    'dragonfly': 4,
    'maple': 1,
    'pumpkins': 2,
    'pinecone': 3,
    'mushroom': 8,
    'moon': 11
}

# Kafka 프로듀서 설정
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

# Spring 서버에 API 요청을 보낼 URL
base_api_url = "https://j11b106.p.ssafy.io/api/main/inventories/items"

# 미리 저장된 item.json에서 아이템 데이터를 로드
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
    kafka_logs = []  # Kafka로 보낼 로그 리스트

    for file in formData:
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data))

        # YOLOv8 모델로 이미지에 대해 객체 탐지 수행
        results = model.predict(image)

        # 탐지 결과 중 신뢰도가 0.8 이상인 것만 처리
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
                        # 탐지 결과를 Kafka 로그에 추가
                        kafka_logs.append({
                            "class_name": class_name,
                            "confidence": float(conf),
                            "fileName": file.filename,
                            "server": "AI_SERVER"  # AI 서버 식별자 추가
                        })

    # Kafka에 로그 전송 (탐지 결과가 있는 경우)
    if kafka_logs:
        for log in kafka_logs:
            send_kafka_message('ai-log', log)

    if detectResult:
        itemId = detectResult["itemId"]

        # item.json 파일에서 데이터를 찾아 응답
        if str(itemId) in item_data:
            item_info = item_data[str(itemId)]
            processed_result = {
                "name": item_info['name'],
                "itemId": itemId,
                "type": item_info['type'],
                "grade": item_info['grade'],
                "effect": item_info['effect'],
            }

            # 빠르게 응답을 전송하고
            response_data = {
                "status": "success",
                "data": {
                    "processed_result": processed_result,
                    "detect_result": detectResult
                }
            }

            # 비동기적으로 REST 요청을 보내 데이터 저장
            final_api_url = f"{base_api_url}/{itemId}/{email}"
            payload = {"detectResult": detectResult}
            requests.post(final_api_url, json=payload)

            return response_data
        else:
            return {"status": "failure", "message": "Item not found in local data"}

    else:
        # 탐지가 없는 경우에도 Kafka에 로그 전송
        send_kafka_message('ai-log', {
            "message": "No detection",
            "email": email,
            "server": "AI_SERVER"  # AI 서버 식별자 추가
        })
        return {"status": "failure", "message": "No detection"}
