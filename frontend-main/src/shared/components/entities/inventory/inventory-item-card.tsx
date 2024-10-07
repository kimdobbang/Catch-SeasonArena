import {
  Body1Text,
  Caption1Text,
  CircleTag,
  ItemTypeTag,
  AutumnItemImage,
} from "@atoms/index";
import { Line } from "@ui/index";
import { Item, ItemGrade, ItemType, getDurability } from "@/app/types/common";

interface InventoryItemCardProps {
  item: Item;
  onClose: () => void;
}

export const InventoryItemCard = ({
  item,
  onClose,
}: InventoryItemCardProps) => {
  const { itemId, name, type, grade, durability } = item;
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
          <div className="h-[5%] w-full justify-end flex p-2 mt-2">
            <CircleTag
              grade={grade as ItemGrade}
              className="bg-catch-gray-300"
            />
          </div>
          <div className="h-[75%] w-full flex flex-col justify-center gap-2 items-center">
            <div className="w-[100px] h-[100px] rounded-xl">
              <AutumnItemImage itemId={itemId} />
            </div>
            <Body1Text>인벤토리 아이템 카드로 수정예정</Body1Text>
            <Body1Text className="!text-catch-gray-300">{name}</Body1Text>
            <Line className="bg-catch-gray-200" />
            <Caption1Text>
              {durability}/{maxDurability} hp
            </Caption1Text>
          </div>
          <div className="h-[20%] w-full flex items-center justify-center flex-col gap-1">
            <ItemTypeTag color="gray" type={type as ItemType} />
          </div>
          {/* 아이템 설명 */}
          {/* 장착해제 토글 */}
        </div>
      </div>
    </div>
  );
};
