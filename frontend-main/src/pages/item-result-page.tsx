import { FailComponent, SuccessComponent } from "@/shared/components/entities";
import { useParams, useLocation } from "react-router-dom";
import { ItemProps } from "@entities/index";
import { ItemGrade, ItemType } from "@/app/types/common";

export const ItemResultPage = () => {
  const { resultType } = useParams(); // "success" or "failure" from URL
  const location = useLocation();

  // 전달된 state에서 resultItem을 안전하게 가져오기 (state가 존재할 때만 저장)
  const resultItem =
    location.state && Object.keys(location.state).length > 0
      ? location.state
      : null;

  // 경로에 따라 행동 유형 결정 (수집/합성)
  const behavior = location.pathname.includes("/combination")
    ? "combine"
    : "collect";

  // combination일 때는 item 정보를 props로 넘길 수 있음
  const combinationItem: ItemProps | undefined =
    behavior === "combine" && resultItem
      ? {
          name: resultItem.name,
          itemId: resultItem.itemId,
          type: resultItem.type.toLowerCase() as ItemType,
          grade: resultItem.grade.toLowerCase() as ItemGrade,
          effect: resultItem.effect,
        }
      : undefined;
  return (
    <>
      {resultType === "success" ? (
        <SuccessComponent behavior={behavior} item={combinationItem} />
      ) : (
        <FailComponent behavior={behavior} />
      )}
    </>
  );
};
