from fastapi import FastAPI, UploadFile, File, Form
from typing import List
from ultralytics import YOLO
from PIL import Image
import io
import requests  # REST 요청을 보내기 위해 사용
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS 설정
origins = [
    "http://localhost:3000",  # 허용할 도메인 (예: 로컬에서 프론트엔드가 실행될 때)
    "https://j11b106.p.ssafy.io"  # 특정 도메인만 허용
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # 허용할 Origin 리스트
    allow_credentials=True,  # 쿠키와 인증 정보를 포함한 요청 허용
    allow_methods=["POST"],  # POST 메서드만 허용
    allow_headers=["*"],  # 모든 HTTP 헤더 허용
)

# YOLOv8 모델 로드
model = YOLO('./model.pt')  # YOLOv8 모델 로드

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

# Spring 서버에 API 요청을 보낼 URL
base_api_url = "https://j11b106.p.ssafy.io/api/main/inventories/items"

@app.post("/api/ai/collections")
async def detect_objects(
    formData: List[UploadFile] = File(...),  # 여러 파일을 받음
    email: str = Form(...)  # 이메일을 받음
):
    detect_result = None
    highest_confidence = 0
    detectResult = None
    # 각 파일에 대해 반복 처리
    for file in formData:
        # 이미지를 메모리로 읽어들이기
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data))

        # YOLOv8 모델로 이미지에 대해 객체 탐지 수행
        results = model.predict(image)

        # 탐지 결과 중 신뢰도가 0.8 이상이고 가장 높은 결과 추출
        for result in results:
            for box, conf, cls in zip(result.boxes.xyxy, result.boxes.conf, result.boxes.cls):  # 경계 상자, 신뢰도, 클래스 ID
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
                            "confidence": float(conf),  # 신뢰도
                            "itemId": class_name_to_item_id[class_name]  # 클래스 이름을 itemId로 변환
                        }

    # 신뢰도 0.8 이상인 탐지 결과가 있을 때만 전송
    if detectResult:
        # itemId를 경로에 포함하기 위해 detectResult에서 추출
        itemId = detectResult["itemId"]

        # Spring 서버에 보낼 최종 URL 생성
        final_api_url = f"{base_api_url}/{itemId}/{email}"

        # 데이터를 전송할 payload 생성
        payload = {
            "detectResult": detectResult  # 탐지 결과 추가
        }

        # Spring 서버에 REST 요청을 보내기
        response = requests.post(final_api_url, json=payload)
        
        # 받은 응답에서 필요한 데이터를 추출
        if response.status_code == 200:
            # 응답 JSON을 파싱
            response_data = response.json()

            # 필요한 데이터를 추출하여 원하는 객체로 변환
            processed_result = {
                "name": response_data['data']['name'],
                "itemId": response_data['data']['id'],
                "type": response_data['data']['type'],
                "grade": response_data['data']['grade'],
                "effect": response_data['data']['effect'],
            }

            # processed_result와 detectResult 함께 반환
            return {
                "status": "success", 
                "data": {
                    "processed_result": processed_result,
                    "detect_result": detectResult  # detectResult도 함께 반환
                }
            }
        else:
            return {"status": "failure", "message": "잘못된 API 요청"}
    else:
        return {"status": "failure", "message": "No detection"}
