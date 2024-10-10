import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useNavigate } from "react-router-dom";
import { CameraButton } from "./camera-button";
import CameraChangeIcon from "@/assets/icons/change-camera.svg?react";
import { sendImagesToServer } from "@/app/apis/collect-api";
import { setSuccess } from "@/app/redux/slice/successSlice";
import { setTimeSlice, clearTimeSlice } from "@/app/redux/slice/timeSlice";
import { ItemGrade, ItemType } from "@/app/types/common";
import Arrow from "@/assets/icons/arrow-left.svg?react";

export const Collect = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userEmail = useSelector((state: RootState) => state.user.email);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement | null>(null); // 디텍션 결과 그릴 캔버스
  const capturedImagesRef = useRef<string[]>([]); // useRef로 이미지 관리
  const [facingMode, setFacingMode] = useState("environment"); // 기본값: 후면 카메라
  const [isCapturing, setIsCapturing] = useState(false); // 사진 촬영 중 상태 관리

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
        videoRef.current.srcObject = null; // 명확하게 카메라 스트림 해제
      }
    };
  }, [facingMode]);

  const switchCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  // 이미지 5장을 찍고 서버에 전송하는 로직
  const autoCapture = () => {
    setIsCapturing(true); // 촬영 시작 시 문구 표시
    let captureCount = 0;
    const interval = setInterval(() => {
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

          // useRef를 이용해 이미지 관리
          capturedImagesRef.current.push(imageUrl);
          captureCount += 1;

          // 5장 캡처 완료 후 전송
          if (captureCount === 5) {
            clearInterval(interval); // 5장의 이미지가 찍히면 중단
            console.log("Captured 5 images, sending to server.");
            handleSendImages();
          }
        }
      }
    }, 100); // 100ms마다 캡처
  };

  const handleSendImages = async () => {
    try {
      // capturedImagesRef.current로 이미지 접근
      const response = await sendImagesToServer({
        capturedImages: capturedImagesRef.current, // ref로부터 이미지 배열 전송
        email: userEmail,
      });

      if (
        response.status === "failure" ||
        response.data.detect_result.itemId === 0
      ) {
        navigate("/collect/fail");
      } else {
        const processedResult = response.data.processed_result;

        const formattedResult = {
          ...processedResult,
          grade: processedResult.grade.toLowerCase() as ItemGrade,
          type: processedResult.type.toLowerCase() as ItemType,
        };

        // timeSlice와 successSlice에 결과 저장
        dispatch(setSuccess(formattedResult));
        dispatch(setTimeSlice(Date.now()));

        // 1분 후 timeSlice 비우기
        setTimeout(() => {
          dispatch(clearTimeSlice());
          console.log("timeSlice cleared after 5 seconds.");
        }, 5000); // 5초 후에 삭제

        navigate("/collect/success");
      }

      setIsCapturing(false); // 촬영 완료 후 문구 숨기기
      capturedImagesRef.current = []; // 이미지 배열 초기화
    } catch (error: any) {
      console.log(`Error sending images: ${error.message}`);
      navigate("/collect/fail");
    }
  };

  // 기본 뒤로 가기 동작 설정
  const handleBackClick = () => {
    navigate("/main");
  };

  return (
    <div className="relative w-full h-full">
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
      <Arrow
        className="absolute ml-[24px] cursor-pointer bottom-[90%] "
        onClick={handleBackClick}
      />
      <button
        onClick={switchCamera}
        className="absolute p-2 bg-catch-sub-300 transform -translate-x-1/2 rounded-lg bottom-[90%] left-[90%]"
      >
        <CameraChangeIcon />
      </button>

      {/* 촬영 중일 때 문구를 표시 */}
      {isCapturing && (
        <div className="absolute top-0 left-0 w-full p-4 text-center text-white bg-black bg-opacity-30">
          사진 촬영 중입니다. 정확한 인식을 위해 잠시만 움직이지 말아 주세요.
        </div>
      )}
    </div>
  );
};
