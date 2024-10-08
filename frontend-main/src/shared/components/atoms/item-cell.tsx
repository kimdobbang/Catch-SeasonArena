// src/shared/components/atoms/item-cell
import { ItemType, ItemGrade, Season } from "@/app/types/common";
import { AutumnItemImage } from "@atoms/index";
// import { useSelector } from "react-redux";
// import { RootState } from "@/app/redux/store";

interface ItemCellProps {
  onClick: () => void;
  inventoryId: number;
  itemId: number;
  name: string;
  type?: ItemType;
  grade?: ItemGrade;
  skill?: string;
  season?: Season;
  description?: string;
  image?: string;
  durability?: number;
  className?: string;
}

export const ItemCell = ({
  // inventoryId,
  itemId,
  className,
  onClick,
}: ItemCellProps) => {
  // Redux에서 장착 상태 확인
  // const { equipment } = useSelector((state: RootState) => state.user);

  // // 해당 아이템이 장착되어 있는지 확인
  // const isEquipped = [equipment.weapon, equipment.active, equipment.passive].some(
  // (equippedItem) => equippedItem?.inventoryId === inventoryId
  // // );

  return (
    <div onClick={onClick}>
      <div
        className={`flex items-center justify-center w-16 h-16 rounded-sm bg-catch-gray-000 ${className}`}
      >
        <AutumnItemImage itemId={itemId} />
      </div>
    </div>
  );
};
