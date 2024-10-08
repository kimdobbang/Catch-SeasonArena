/** 수집, 합성에서 사용되는 카드 */
import {
  Body1Text,
  Caption1Text,
  CircleTag,
  ItemTypeTag,
  AutumnItemImage,
} from "@atoms/index";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Line } from "./line";
import { ItemGrade, ItemType, getDurability } from "@/app/types/common";
import { ItemProps } from "@entities/index";
export const GetItemCard = ({
  behavior,
  onClose,
  item,
}: {
  behavior?: "combine" | "collect";
  onClose: () => void;
  item?: ItemProps;
}) => {
  // Redux에서 값 가져오기 (collect일 때 사용)
  const successState = useSelector((state: RootState) => state.success);

  // behavior에 따라 Redux 또는 props로부터 값 설정
  const selectedItem = behavior === "collect" ? successState : item;

  // 변수 초기화
  const tName = selectedItem?.name || "아이템";
  const tItemId = selectedItem?.itemId || 1;
  const tType = (selectedItem?.type as ItemType) || "weapon"; // 소문자로 변환
  const tGrade = (selectedItem?.grade as ItemGrade) || "normal"; // 소문자로 변환
  const tEffect = selectedItem?.effect || "효과 없음";

  const durability = getDurability(tGrade);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="flex justify-center items-center p-2 w-[240px] rounded-lg h-[320px] bg-gradient-to-b from-catch-sub-400 to-catch-sub-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col justify-center w-full h-full bg-white rounded-md">
          <div className="h-[5%] w-full justify-end flex p-2 mt-2">
            <CircleTag grade={tGrade} className="bg-catch-sub-200" />
          </div>
          <div className="h-[75%] w-full flex flex-col justify-center gap-2 items-center">
            <div className="w-[100px] h-[100px] rounded-xl">
              <AutumnItemImage itemId={tItemId} />
            </div>
            <Body1Text>{tName}</Body1Text>
            <Line className="bg-catch-sub-300" />
            <Caption1Text>
              {durability}/{durability} hp
            </Caption1Text>
          </div>
          <div className="h-[20%] w-full flex items-center justify-center flex-col gap-1">
            <ItemTypeTag color="orange" type={tType} />
            <Caption1Text>{tEffect}</Caption1Text>
          </div>
        </div>
      </div>
    </div>
  );
};
