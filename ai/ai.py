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

# 외부 API 엔드포인트
api_url = "https://j11b106.p.ssafy.io/api/main/inventories/items"

@app.post("/api/ai/collections")
async def detect_objects(
    formData: List[UploadFile] = File(...),  # 여러 파일을 받음
    email: str = Form(...)  # 이메일을 받음
):
    detect_result = None
    highest_confidence = 0

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
        payload = {
            "email": email,  # 이메일 추가
            "detectResult": detectResult  # 탐지 결과 추가
        }

        # REST 요청을 보내기
        response = requests.post(api_url, json=payload)

    if response.status_code == 200:
        return {"status": "success"}
    else:
        return {"status": "failure"}