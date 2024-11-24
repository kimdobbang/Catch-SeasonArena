import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { AutumnItemImage, Body2Text } from "@/shared/components/atoms";
import { DescriptionBox } from "@entities/index";
import { ResultButtonsProps } from "./item-result-buttons";
import { ItemGrade, ItemType } from "@/app/types/common";
import { GetItemCard } from "@/shared/ui";

export interface ItemProps {
  name?: string;
  itemId?: number;
  type?: ItemType;
  grade?: ItemGrade;
  effect?: string;
}

export const ItemSuccessContent = ({
  behavior,
  item,
}: ResultButtonsProps & { item?: ItemProps }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Redux에서 값 가져오기 (collect일 때 사용)
  const successState = useSelector((state: RootState) => state.success);

  // 모달 열기 함수
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // behavior에 따라 Redux 또는 props로부터 값 설정
  const selectedItem = behavior === "collect" ? successState : item;

  // 변수 초기화
  const tName = selectedItem?.name || "아이템";
  const tItemId = selectedItem?.itemId || 1;
  const tType = (selectedItem?.type as ItemType) || "weapon"; // 소문자로 변환
  const tGrade = (selectedItem?.grade as ItemGrade) || "normal"; // 소문자로 변환
  const tEffect = selectedItem?.effect || "효과 없음";

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
      {isModalOpen && (
        <GetItemCard onClose={closeModal} behavior={behavior} item={item} />
      )}
    </div>
  );
};
