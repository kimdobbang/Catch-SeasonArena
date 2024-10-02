FROM python:3.10

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir --upgrade -r requirements.txt
RUN apt-get update && apt-get install libgl1-mesa-glx -y

COPY . .
 
CMD ["uvicorn", "ai:app", "--host", "0.0.0.0", "--port", "8000"]