// src/shared/components/atoms/item-cell
import { ItemType, ItemGrade, Season } from "@/app/types/common";
import { AutumnItemImage } from "@atoms/index";

interface ItemCellProps {
  onClick: () => void;
  inventoryId: number;
  itemId: number;
  name?: string;
  type?: ItemType;
  grade?: ItemGrade;
  skill?: string;
  season?: Season;
  description?: string;
  image?: string;
  durability?: number;
  className?: string;
}

export const ItemCell = ({ onClick, itemId, className }: ItemCellProps) => {
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
