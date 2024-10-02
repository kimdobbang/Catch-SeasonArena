import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CameraButton } from "./camera-button";
import CameraChangeIcon from "@/assets/icons/change-camera.svg?react";

export const Collect = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const capturedImagesRef = useRef<string[]>([]); // useRef로 상태 값 추적
  const capturedLen = useRef(0);
  const [facingMode, setFacingMode] = useState("environment"); // 기본값: 후면 카메라
  const [email, setEmail] = useState(""); // 이메일 상태 추가
  let interval: ReturnType<typeof setInterval> | undefined;

  useEffect(() => {
    console.log("Captured Images updated:", capturedImages);
  }, [capturedImages]);

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    initCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  const switchCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  const autoCapture = () => {
    interval = setInterval(() => {
      if (videoRef.current && canvasRef.current && overlayRef.current) {
        const context = canvasRef.current.getContext("2d");
        if (context) {
          // 캔버스 크기를 캡처할 오버레이 크기(320x320)로 설정합니다.
          canvasRef.current.width = 320;
          canvasRef.current.height = 320;

          // 비디오의 실제 해상도 가져오기
          const videoWidth = videoRef.current.videoWidth;
          const videoHeight = videoRef.current.videoHeight;

          const {
            width: renderedWidth,
            height: renderedHeight,
            x: videoX,
            y: videoY,
          } = videoRef.current.getBoundingClientRect();

          const {
            x: overlayX,
            y: overlayY,
            width: overlayWidth,
            height: overlayHeight,
          } = overlayRef.current.getBoundingClientRect();

          const scaleX = videoWidth / renderedWidth;
          const scaleY = videoHeight / renderedHeight;

          const sx = (overlayX - videoX) * scaleX;
          const sy = (overlayY - videoY) * scaleY;

          context.drawImage(
            videoRef.current,
            sx,
            sy,
            overlayWidth * scaleX,
            overlayHeight * scaleY,
            0,
            0,
            320,
            320,
          );

          const imageUrl = canvasRef.current.toDataURL("image/png");

          // 상태와 ref 둘 다 업데이트
          setCapturedImages((prevCapturedImages) => {
            const updatedImages = [...prevCapturedImages, imageUrl];
            capturedImagesRef.current = updatedImages; // ref 업데이트
            return updatedImages;
          });

          // 캡처된 이미지 수를 추적
          capturedLen.current++;

          if (capturedLen.current >= 20) {
            clearInterval(interval);
            sendImagesToServer();
          }
        }
      }
    }, 100); // 100ms마다 캡처
  };

  const sendImagesToServer = async () => {
    console.log("CAptured Images 배열: ", capturedImages);
    const formData = new FormData();

    // 이메일을 formData에 추가
    formData.append("email", "seung@dd"); // 이메일을 "email"이라는 key로 추가

    console.log("Captured Images for upload:", capturedImagesRef.current);

    // 이미지 배열의 각 이미지 URL을 Blob 형태로 변환하여 FormData에 추가
    capturedImagesRef.current.forEach((image, index) => {
      console.log("Processing image:", index); // 각 이미지가 처리되는지 확인

      const byteString = atob(image.split(",")[1]);
      const mimeString = image.split(",")[0].split(":")[1].split(";")[0];

      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([ab], { type: mimeString });

      // Blob의 정보 출력
      console.log("Blob 생성 완료:", blob);
      console.log("Blob 크기:", blob.size); // Blob의 크기 출력
      console.log("Blob 타입:", blob.type); // Blob의 MIME 타입 출력

      formData.append("formData", blob, `captured-image-${index + 1}.png`);
    });

    // FormData 확인을 위한 콘솔 로그 출력
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    try {
      const response = await axios.post(
        "https://j11b106.p.ssafy.io/api/ai/collections",
        formData, // 이미지 파일 배열과 이메일을 포함한 FormData 전송
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log("Images sent to server:", response.data);
    } catch (error) {
      console.error("Error sending images to server:", error);
    }
  };

  const downloadImage = (url: string, index: number) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `captured-image-${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative w-full h-full">
      <video className="w-full h-full" ref={videoRef} autoPlay playsInline />

      <div
        ref={overlayRef}
        className="absolute top-1/2 left-1/2 w-[320px] h-[320px] border-4 border-opacity-80 border-white"
        style={{ transform: "translate(-50%, -50%)", pointerEvents: "none" }}
      ></div>
      <canvas ref={canvasRef} style={{ display: "none" }} />

      <CameraButton
        onClick={autoCapture}
        className="absolute transform -translate-x-1/2 bottom-5 left-1/2"
      />

      <button
        onClick={switchCamera}
        className="absolute p-2 bg-red-400 text-white transform -translate-x-1/2 bottom-[90%] left-[90%]"
      >
        <CameraChangeIcon />
      </button>
      <input
        type="email"
        placeholder="이메일을 입력하세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // 이메일 입력 필드
        className="text-black bg-white border "
      />

      <button onClick={() => navigate("processing")}>수집 게임으로 이동</button>
      <div className="absolute top-0 left-0 m-4 bg-white p-2 max-h-[300px] overflow-y-auto">
        <h3 className="text-lg font-bold">Captured Images:</h3>
        <div className="flex flex-wrap gap-2">
          {capturedImages.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img}
                alt={`Captured ${index + 1}`}
                className="w-[80px] h-[80px] object-cover border"
              />
              <button
                onClick={() => downloadImage(img, index)}
                className="absolute p-1 text-xs text-white bg-gray-700 rounded bottom-1 right-1"
              >
                다운로드
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
