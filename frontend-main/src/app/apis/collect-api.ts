// 책임 분리
// 각 컴포넌트: 상태관리, 스토리지 관리, API 처리 책임
// Api: API 호출과 서버 통신 책임, 데이터 통신(여기서 상태관리x)
import config from "@/config";
import axios from "axios";

// 수집 api 관련 타입
// processed_result 타입 정의
export interface ProcessedResult {
  name: string;
  itemId: number;
  type: string;
  grade: string;
  effect: string;
}

// detect_result 타입 정의
export interface DetectResult {
  fileName: string;
  xmin: number;
  ymin: number;
  xmax: number;
  ymax: number;
  confidence: number;
  itemId: number;
}

// 전체 응답 구조 타입 정의
export interface ResponseCollectData {
  status: string;
  data: {
    processed_result: ProcessedResult;
    detect_result: DetectResult;
  };
}

// base64 문자열을 Blob으로 변환하는 함수
const base64ToBlob = (base64Data: string, contentType: string = "") => {
  const byteCharacters = atob(base64Data.split(",")[1]); // base64Data의 콤마 뒤부터 데이터가 시작
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
};

export const sendImagesToServer = async ({
  capturedImages,
  email,
}: {
  capturedImages: string[];
  email: string;
}) => {
  const formData = new FormData();

  // 이메일을 formData에 추가
  formData.append("email", email); // 이메일을 "email"이라는 key로 추가

  // 이미지 배열의 각 이미지 URL을 Blob 형태로 변환하여 FormData에 추가
  capturedImages.forEach((image, index) => {
    console.log("Processing image:", index); // 각 이미지가 처리되는지 확인

    const mimeString = image.split(",")[0].split(":")[1].split(";")[0];
    const blob = base64ToBlob(image, mimeString); // base64를 Blob으로 변환

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
      `${config.API_BASE_URL}/api/ai/collections`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    console.log("Images sent to server:", response.data);
    return response.data; // 서버 응답 반환
  } catch (error) {
    console.error("Error sending images to server:", error);
    throw error; // 에러가 발생하면 던져서 호출한 곳에서 처리할 수 있도록 함
  }
};

export const sendPublicImagesToServer = async ({
  email,
}: {
  email: string;
}) => {
  const imagePaths = [
    "/collect-test/image1.png", // public 폴더 내 이미지 경로
    "/collect-test/image2.png", // 추가적인 이미지 경로
    "/collect-test/image3.png",
    "/collect-test/image4.png",
    "/collect-test/image5.png",
  ];

  const formData = new FormData();
  // 이메일을 formData에 추가
  formData.append("email", email); // 이메일을 "email"이라는 key로 추가

  console.log("fornDATA: ", formData);
  try {
    // 각 이미지 경로에 대해 이미지 로드 및 Blob으로 변환
    for (let i = 0; i < imagePaths.length; i++) {
      const imagePath = imagePaths[i];

      const response = await fetch(imagePath); // 이미지를 불러옴
      const blob = await response.blob(); // 이미지 데이터를 Blob으로 변환

      formData.append("formData", blob, `image-${i + 1}.png`); // FormData에 이미지 추가
      console.log("formDATA: ", formData);
    }

    console.log("formDATA: ", formData);
    // 서버로 이미지 전송
    const serverResponse = await axios.post(
      `${config.API_BASE_URL}/api/ai/collections`, // 실제 서버 URL로 변경
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    console.log("Images successfully sent to server:", serverResponse.data);

    return serverResponse.data;
  } catch (error) {
    console.error("Error uploading images:", error);
  }
};
