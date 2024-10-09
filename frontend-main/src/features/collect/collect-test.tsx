import { useRef, useEffect, useState } from "react";
import axios from "axios";

export const CollectTest = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const capturedLen = useRef(0);
  let interval: ReturnType<typeof setInterval> | undefined;

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
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
  }, []);

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

          // 비디오와 오버레이의 위치와 크기 정보 가져오기
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

          // 비디오 해상도와 렌더링된 크기 간의 비율 계산
          const scaleX = videoWidth / renderedWidth;
          const scaleY = videoHeight / renderedHeight;

          // 오버레이 내부 영역의 시작 좌표를 비디오 기준으로 계산
          const sx = (overlayX - videoX) * scaleX;
          const sy = (overlayY - videoY) * scaleY;

          // 오버레이의 크기를 비디오의 해상도에 맞게 조정하여 캡처
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

          // 캔버스의 내용을 이미지 URL로 변환합니다.
          const imageUrl = canvasRef.current.toDataURL("image/png");

          setCapturedImages((prev) => [...prev, imageUrl]);

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
    try {
      const response = await axios.post("/api/upload", {
        images: capturedImages,
      });
      console.log("Images sent to server:", response.data);
    } catch (error) {
      console.error("Error sending images to server:", error);
    }
  };

  // 개별 이미지 다운로드 함수
  const downloadImage = (url: string, index: number) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `captured-image-${index + 1}.png`; // 파일명을 유일하게 설정
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative w-full h-full">
      <video className="w-full h-full" ref={videoRef} autoPlay playsInline />

      {/* 오버레이: 캡처할 영역을 시각적으로 표시 */}
      <div
        ref={overlayRef}
        className="absolute top-1/2 left-1/2 w-[320px] h-[320px] border-4 border-red-500"
        style={{
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      ></div>

      <canvas ref={canvasRef} style={{ display: "none" }} />

      <button
        onClick={autoCapture}
        className="absolute bottom-5 left-1/2 transform -translate-x-1/2 p-2 bg-blue-500 text-white"
      >
        자동 캡처 시작
      </button>

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
                className="absolute bottom-1 right-1 bg-gray-700 text-white p-1 rounded text-xs"
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
