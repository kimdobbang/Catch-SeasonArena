import { useLocation } from "react-router-dom";
import {
  Body1Text,
  Caption1Text,
  CircleTag,
  ItemTypeTag,
  AutumnItemImage,
  Body2Text,
} from "@atoms/index";
import { Line } from "@ui/index";
import { Item, ItemGrade, ItemType, getDurability } from "@/app/types/common";

interface InventoryItemCardProps {
  item: Item;
  onClose: () => void;
  onCombinationClick?: () => void;
}

export const InventoryItemCard = ({
  item,
  onClose,
}: InventoryItemCardProps) => {
  // 경로에 따라 행동 유형 결정 (인벤토리/합성)
  const location = useLocation();
  const behavior = location.pathname.includes("/combination")
    ? "combination"
    : "inventory";

  const { itemId, name, type, grade, durability, skill } = item;
  const maxDurability = getDurability(grade as ItemGrade);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="flex justify-center items-center p-2 w-[240px] rounded-lg h-[320px] bg-gradient-to-b from-catch-gray-200 to-catch-sub-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col justify-center w-full h-full bg-white rounded-md">
          {/* 원형 태그 */}
          <div className="h-[5%] w-full justify-end flex p-2 mt-2">
            <CircleTag
              grade={grade as ItemGrade}
              className="bg-catch-gray-300"
            />
          </div>
          {/* 이미지, 아이템 이름, 내구도 */}
          <div className="h-[65%] w-full flex flex-col justify-center gap-2 items-center">
            <div className="w-[100px] h-[100px] rounded-xl">
              <AutumnItemImage itemId={itemId} />
            </div>
            <Body1Text className="!text-catch-gray-300">{name}</Body1Text>
            <Line className="bg-catch-gray-200" />
            <Caption1Text>
              {durability}/{maxDurability} hp
            </Caption1Text>
          </div>
          {/* 아이템타입, 스킬 */}
          <div className="h-[15%] w-full flex items-center justify-center flex-col gap-1">
            <ItemTypeTag color="gray" type={type as ItemType} />
            <Caption1Text>{skill}</Caption1Text>
          </div>
          {/* 장착해제 토글 */}
          <div className="h-[15%] w-full flex items-center justify-center flex-col gap-1">
            <div className="flex flex-row items-center justify-around w-full h-full">
              {/* 인벤토리 */}
              {behavior === "inventory" && (
                <button>
                  <Body2Text className="font-bold text-catch-gray-500">
                    장착
                  </Body2Text>
                </button>
              )}
              {/* 합성 */}
              {behavior === "combination" && (
                <button>
                  <Body2Text className="font-bold text-catch-gray-500">
                    추가
                  </Body2Text>
                </button>
              )}
              <button>
                <Body2Text className="font-bold text-catch-system-color-error">
                  삭제
                </Body2Text>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
