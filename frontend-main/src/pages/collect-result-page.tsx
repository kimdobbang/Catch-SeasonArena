// import { useEffect, useState } from "react";
import { ItemFail } from "@entities/index";
// import { ItemSuccess } from "@entities/index";

// // API 응답 타입 정의
// interface CollectResultResponse {
//   success: boolean;
// }

export const CollectResultPage = () => {
  // const [result, setResult] = useState<"success" | "fail" | null>(null); // 상태 타입 지정

  // useEffect(() => {
  //   // API 호출을 통해 결과를 받아오는 함수
  //   const fetchResult = async () => {
  //     try {
  //       // API 호출 (예: fetch 또는 axios 사용)
  //       const response = await fetch("/api/collect/result"); // 예시 URL
  //       const data: CollectResultResponse = await response.json();

  //       // 성공 또는 실패 여부에 따라 상태 업데이트
  //       if (data.success) {
  //         setResult("success");
  //       } else {
  //         setResult("fail");
  //       }
  //     } catch (error) {
  //       // 에러 처리
  //       console.error("API 호출 오류:", error);
  //       setResult("fail"); // 에러 발생 시 기본적으로 실패로 처리
  //     }
  //   };

  //   fetchResult();
  // }, []);

  return (
    <div className="w-full h-full">
      {/* 조건부 렌더링: 결과에 따라 다른 컴포넌트 렌더링 */}
      {/* {result === "success" && <ItemFail />}
      {result === "fail" && <ItemSuccess />} */}
      <ItemFail />
    </div>
  );
};
