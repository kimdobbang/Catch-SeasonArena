import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CameraButton } from "./camera-button";
import CameraChangeIcon from "@/assets/icons/change-camera.svg?react";
import {
  ResponseCollectData,
  sendImagesToServer,
} from "@/app/apis/collect-api";
import { setSuccess } from "@/app/redux/slice/successSlice";
import { ItemGrade, ItemType } from "@/app/types/common";
import Arrow from "@/assets/icons/arrow-left.svg?react";

export const Collect = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userEmail = useSelector((state: RootState) => state.user.email);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement | null>(null); // 디텍션 결과 그릴 캔버스
  const [, setCapturedImages] = useState<string[]>([]);
  const capturedImagesRef = useRef<string[]>([]); // 이미지 배열을 추적
  const [facingMode, setFacingMode] = useState("environment"); // 기본값: 후면 카메라
  const bestResultRef = useRef<ResponseCollectData | null>(null); // 가장 높은 신뢰도를 추적
  const noDetectionCountRef = useRef(0); // no detection 카운트
  // 3번의 API 응답 처리가 끝난 후 한 번에 페이지를 이동하기 위해 응답 상태를 관리
  // const totalResponsesRef = useRef<number>(0); // 총 응답 수를 추적
  // const [debugInfo, setDebugInfo] = useState<string>(""); // 디버그 정보 상태

  let interval: ReturnType<typeof setInterval> | undefined;

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
      // 페이지를 떠날 때 카메라 트랙을 중지하여 빨간 줄이 안 나오도록 처리
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null; // 명확하게 카메라 스트림 해제
      }
      if (interval) clearInterval(interval);
    };
  }, [facingMode]);

  const switchCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  // 이미지 15장을 100ms마다 찍고, 5개씩 모아서 서버에 전송
  const autoCapture = () => {
    interval = setInterval(() => {
      if (videoRef.current && canvasRef.current && overlayCanvasRef.current) {
        const context = canvasRef.current.getContext("2d");
        if (context) {
          // 캔버스 크기를 설정합니다.
          canvasRef.current.width = 320;
          canvasRef.current.height = 320;

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
          } = overlayCanvasRef.current.getBoundingClientRect();

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
            capturedImagesRef.current = updatedImages;
            return updatedImages;
          });

          if (capturedImagesRef.current.length % 5 === 0) {
            // 배치별로 전송을 위한 startIndex와 endIndex 설정
            const startIndex = capturedImagesRef.current.length - 5;
            const endIndex = capturedImagesRef.current.length;
            handleSendImages(startIndex, endIndex);
          }

          // 15장이면 캡처 중단
          if (capturedImagesRef.current.length === 15) {
            clearInterval(interval); // 15장의 이미지가 찍히면 중단
            console.log("Captured 15 images, stopping.");
          }
        }
      }
    }, 100); // 100ms마다 캡처
  };

  const handleSendImages = async (startIndex: number, endIndex: number) => {
    try {
      const imageBatch = capturedImagesRef.current.slice(startIndex, endIndex);
      const response = await sendImagesToServer({
        capturedImages: imageBatch,
        email: userEmail,
      });

      if (
        response.status === "failure" ||
        response.data.detect_result.itemId === 0
      ) {
        noDetectionCountRef.current += 1;
      } else {
        const detectResult = response.data.detect_result;
        if (
          !bestResultRef.current ||
          detectResult.confidence >
            bestResultRef.current?.data.detect_result.confidence
        ) {
          bestResultRef.current = response;
        }
      }

      // // 디버그 정보를 화면에 출력
      // setDebugInfo(`
      //   Response: ${JSON.stringify(response)}
      //   No Detection Count: ${noDetectionCountRef.current}
      //   Best Result: ${JSON.stringify(bestResultRef.current)}
      // `);

      if (noDetectionCountRef.current >= 3) {
        navigate("/collect/fail");
      } else if (
        capturedImagesRef.current.length >= 15 &&
        bestResultRef.current
      ) {
        const processedResult = bestResultRef.current.data.processed_result;
        const formattedResult = {
          ...processedResult,
          grade: processedResult.grade.toLowerCase() as ItemGrade,
          type: processedResult.type.toLowerCase() as ItemType,
        };
        dispatch(setSuccess(formattedResult));
        navigate("/collect/success");
      }
    } catch (error: any) {
      // setDebugInfo(`Error sending images: ${error.message}`);
      console.log(`Error sending images: ${error.message}`);
      navigate("/collect/fail");
    }
  };

  // // DetectResult 좌표를 캔버스에 그리는 함수
  // const drawDetectionResult = (detectResult: ResponseCollectData) => {
  //   if (overlayCanvasRef.current) {
  //     const context = overlayCanvasRef.current.getContext("2d");
  //     if (context) {
  //       context.clearRect(
  //         0,
  //         0,
  //         overlayCanvasRef.current.width,
  //         overlayCanvasRef.current.height,
  //       );
  //       context.strokeStyle = "red";
  //       context.lineWidth = 2;
  //       context.strokeRect(
  //         detectResult.data.detect_result.xmin,
  //         detectResult.data.detect_result.ymin,
  //         detectResult.data.detect_result.xmax -
  //           detectResult.data.detect_result.xmin,
  //         detectResult.data.detect_result.ymax -
  //           detectResult.data.detect_result.ymin,
  //       );
  //     }
  //   }
  // };

  // 기본 뒤로 가기 동작 설정
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="relative w-full h-full">
      <header
        className={`text-body1 flex flex-row gap-2 justify-start items-center h-[65px] font-bold `}
      >
        <Arrow className="ml-[24px] cursor-pointer" onClick={handleBackClick} />
      </header>
      <video className="w-full h-full" ref={videoRef} autoPlay playsInline />
      <canvas
        ref={overlayCanvasRef}
        className="absolute top-1/2 left-1/2 w-[320px] h-[320px] border-4 border-opacity-80 border-white"
        style={{ transform: "translate(-50%, -50%)", pointerEvents: "none" }}
      />
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
      {/* 
      // 디버그 정보 표시
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
            </div>
          ))}
        </div>
      </div>
 
      <div className="absolute bottom-0 left-0 m-4 bg-white p-2 max-h-[300px] overflow-y-auto">
        <pre>{debugInfo}</pre>
      </div> */}
    </div>
  );
};
