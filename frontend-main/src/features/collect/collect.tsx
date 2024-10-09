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
  sendPublicImagesToServer,
} from "@/app/apis/collect-api";
import { setSuccess } from "@/app/redux/slice/successSlice";

export const Collect = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userEmail = useSelector((state: RootState) => state.user.email);

  const handleSuccessResponse = (responseData: ResponseCollectData) => {
    const processedResult = {
      ...responseData.data.processed_result,
      type: responseData.data.processed_result.type.toLowerCase(), // type을 소문자로 변환
      grade: responseData.data.processed_result.grade.toLowerCase(), // grade를 소문자로 변환
    };
    console.log("Updating Redux with:", processedResult);
    dispatch(setSuccess(processedResult)); // processed_result 데이터를 저장
  };

  // const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const capturedImagesRef = useRef<string[]>([]); // useRef로 상태 값 추적
  const capturedLen = useRef(0);
  const [facingMode, setFacingMode] = useState("environment"); // 기본값: 후면 카메라
  let interval: ReturnType<typeof setInterval> | undefined;

  useEffect(() => {
    console.log("Captured Images updated:", capturedImages);
    if (capturedImages.length >= 5) {
      handleSendImages();
    }
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
            // 로그를 추가하여 이미지 배열 확인
            console.log("Updated images array: ", updatedImages);
            return updatedImages;
          });

          // 캡처된 이미지 수를 추적
          capturedLen.current++;
          console.log(`Image ${capturedLen.current} captured`); // 각 이미지가 제대로 캡처되는지 확인

          if (capturedLen.current >= 5) {
            clearInterval(interval);
          }
        }
      }
    }, 100); // 100ms마다 캡처
  };

  const handleSendImages = async () => {
    try {
      if (capturedImagesRef.current.length < 5) {
        console.log("이미지가 충분하지 않습니다.");
        return;
      }
      const response = await sendImagesToServer({
        capturedImages: capturedImagesRef.current,
        email: userEmail,
      });

      if (response.status === "failure") {
        alert(`API 디텍션 실패 응답: ${response.message}`);
      } else if (response.state === "success") {
        alert(`성공: ${response.data.processed_result.name}`);
      } else {
        alert("이유모를 실패");
      }
    } catch (error) {
      console.error("이미지 전송 중 오류 발생: ", error);
    }
  };

  const successTest = async () => {
    try {
      const response = await sendPublicImagesToServer({
        email: userEmail,
      });
      if (response.status === "success") {
        console.log("호출 성공!");
        console.log("Response Data:", response); // 응답 데이터 구조 확인
        handleSuccessResponse(response);
        navigate("/collect/success");
      } else if (response.status === "failure") {
        console.log("실패한 결과: ", response);
        navigate("/collect/fail");
      } else {
        console.log("API 호출 실패: 알 수 없는 상태");
        navigate("/collect/fail");
      }
    } catch (error) {
      console.error("Error during API call:", error);
      navigate("/collect/fail");
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

      <button onClick={successTest}>성공 테스트 버튼</button>
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
