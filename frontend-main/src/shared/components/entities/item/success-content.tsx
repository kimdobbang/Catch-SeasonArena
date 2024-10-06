import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { AutumnItemImage, Body2Text } from "@/shared/components/atoms";
import { DescriptionBox } from "./description-box";
import { ResultButtonsProps } from "./result-buttons";
import { ItemGrade, ItemType } from "@/app/types/common";
import { CollectCard } from "@/shared/ui";

export const SuccessContent = ({ behavior }: ResultButtonsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { name, itemId, type, grade, effect } = useSelector(
    (state: RootState) => state.success,
  );

  // 모달 열기 함수
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    console.log("모달닫기");
    setIsModalOpen(false);
  };

  // 변수에 기본값을 제공하여 초기화
  let tName: string = "아이템"; // 기본값
  let tItemId: number = 1;
  let tType: ItemType = "weapon"; // 기본값
  let tGrade: ItemGrade = "normal"; // 기본값
  let tEffect: string = "효과 없음"; // 기본값

  if (behavior === "collect") {
    // 값이 있을 경우 할당, 없으면 기본값 유지
    tName = name || "아이템";
    tItemId = itemId || 1;
    tType = (type?.toLowerCase() as ItemType) || "weapon";
    tGrade = (grade?.toLowerCase() as ItemGrade) || "normal";
    tEffect = effect || "효과 없음";
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full h-[20%] flex flex-col items-center justify-center">
        <Body2Text>
          <b>{tName}</b> 아이템을
          <br />
          획득하였습니다
        </Body2Text>
      </div>
      <div className="w-full h-[80%] flex flex-col justify-center items-center">
        <div
          className="w-[200px] h-[200px] rounded-xl flex items-center justify-center"
          onClick={openModal}
        >
          <AutumnItemImage itemId={tItemId} />
        </div>
        <DescriptionBox type={tType} grade={tGrade} skill={tEffect} />
      </div>
      {isModalOpen && <CollectCard onClose={closeModal} />}
    </div>
  );
};
