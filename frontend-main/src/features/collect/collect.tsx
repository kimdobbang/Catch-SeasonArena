import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useNavigate } from "react-router-dom";
import { CameraButton } from "./camera-button";
import CameraChangeIcon from "@/assets/icons/change-camera.svg?react";
import { sendImagesToServer } from "@/app/apis/collect-api";
import { setSuccess } from "@/app/redux/slice/successSlice";
import { setTimeSlice } from "@/app/redux/slice/timeSlice";
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

    // 컴포넌트가 언마운트될 때 카메라 스트림 중지
    return () => {
      stopCamera();
    };
  }, [facingMode]);

  // 카메라 스트림 중단 함수
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks(); // 모든 트랙을 가져와 중지
      tracks.forEach((track) => track.stop()); // 트랙 중단
      videoRef.current.srcObject = null; // 스트림 해제
    }
  };

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
        stopCamera();
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
        stopCamera();
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
      {/* 카메라 비디오 */}
      <video
        className="absolute top-0 left-0 object-cover w-full h-full"
        ref={videoRef}
        autoPlay
        playsInline
      />

      {/* 캡처 영역 오버레이 */}
      <div className="absolute top-1/2 left-1/2 w-[320px] h-[320px] transform -translate-x-1/2 -translate-y-1/2">
        {/* 가운데 십자가 */}
        <div className="absolute w-4 h-4 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          {/* 가로선 */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white transform -translate-y-1/2" />
          {/* 세로선 */}
          <div className="absolute top-0 left-1/2 h-full w-[2px] bg-white transform -translate-x-1/2" />
        </div>

        {/* 네 모서리 직각 선 */}
        {/* 좌상단 */}
        <div className="absolute top-0 left-0 w-8 h-8">
          <div className="w-[2px] h-full bg-white" /> {/* 세로선 */}
          <div className="absolute top-0 right-0 w-full h-[2px] bg-white" />
        </div>

        {/* 우상단 */}
        <div className="absolute top-0 right-0 w-8 h-8">
          <div className="w-[2px] h-full bg-white absolute right-0" />
          {/* 세로선 */}
          <div className="absolute top-0 right-0 w-full h-[2px] bg-white" />
          {/* 가로선 */}
        </div>

        {/* 좌하단 */}
        <div className="absolute bottom-0 left-0 w-8 h-8">
          <div className="absolute bottom-0 left-0 w-[2px] h-full bg-white" />
          {/* 세로선 */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white" />
          {/* 가로선 */}
        </div>

        {/* 우하단 */}
        <div className="absolute bottom-0 right-0 w-8 h-8">
          <div className="absolute bottom-0 right-0 w-[2px] h-full bg-white" />
          {/* 세로선 */}
          <div className="absolute bottom-0 right-0 w-full h-[2px] bg-white" />
          {/* 가로선 */}
        </div>
      </div>

      {/* 캔버스 (오버레이 및 백업 캡처용) */}
      <canvas
        ref={overlayCanvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />

      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* 촬영 버튼 */}
      <CameraButton
        onClick={autoCapture}
        className="absolute w-16 h-16 transform -translate-x-1/2 bottom-5 left-1/2"
      />

      {/* 뒤로 가기 아이콘 */}
      <Arrow
        className="absolute w-8 h-8 text-white cursor-pointer top-5 left-5"
        onClick={handleBackClick}
      />

      {/* 카메라 전환 버튼 */}
      <button
        onClick={switchCamera}
        className="absolute w-12 h-12 p-2 rounded-lg top-5 right-5 bg-catch-sub-300"
      >
        <CameraChangeIcon />
      </button>

      {/* 촬영 중일 때 문구를 표시 */}
      {isCapturing && (
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-center text-white bg-black bg-opacity-30">
          아이템 탐지 중입니다. <br /> 정확한 인식을 위해 <br />
          잠시 움직이지 말아 주세요.
        </div>
      )}
    </div>
  );
};
