from fastapi import FastAPI, UploadFile, File
from ultralytics import YOLO
from PIL import Image
import io

app = FastAPI()

# YOLOv8 모델 로드
model = YOLO('C:\\Users\\SSAFY\\Downloads\\6_best.pt_240919\\best.pt')  # YOLOv8n 모델 (n, s, m, l, x 중 선택 가능)

@app.post("/ai/")
async def detect_objects(file: UploadFile = File(...)):
    # 이미지를 메모리로 읽어들이기
    image_data = await file.read()
    image = Image.open(io.BytesIO(image_data))

    # YOLOv8 모델로 이미지에 대해 객체 탐지 수행
    results = model.predict(image)

    # 결과에서 bounding boxes 좌표, 클래스 이름 및 신뢰도 추출
    detections = []
    for result in results:
        for box, conf, cls in zip(result.boxes.xyxy, result.boxes.conf, result.boxes.cls):  # 경계 상자, 신뢰도, 클래스 ID
            class_name = model.names[int(cls)]  # 클래스 ID로부터 클래스 이름 가져오기
            detections.append({
                "xmin": int(box[0]),
                "ymin": int(box[1]),
                "xmax": int(box[2]),
                "ymax": int(box[3]),
                "confidence": float(conf),  # 신뢰도
                "class_name": class_name  # 클래스 이름 반환
            })

    return {"detections": detections}
