import { FailComponent, SuccessComponent } from "@/shared/components/entities";
import { useParams, useLocation } from "react-router-dom";

export const ItemResultPage = () => {
  const { resultType } = useParams(); // "success" or "failure" from URL
  const location = useLocation();

  // 경로에 따라 행동 유형 결정 (수집/합성)
  const behavior = location.pathname.includes("/combination")
    ? "combine"
    : "collect";

  return (
    <>
      {resultType === "success" ? (
        <SuccessComponent behavior={behavior} />
      ) : (
        <FailComponent behavior={behavior} />
      )}
    </>
  );
};
