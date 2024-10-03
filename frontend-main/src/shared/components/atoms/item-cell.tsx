// src/shared/components/atoms/item-cell
import { ItemType, ItemGrade, Season } from "@/app/types/common";

interface ItemCellProps {
  onClick?: () => void;
  id?: number;
  itemId?: number;
  name: string;
  type: ItemType;
  grade?: ItemGrade;
  skill?: string;
  season?: Season;
  description?: string;
  image?: string;
  durability?: number;
  className?: string;
}

export const ItemCell = ({
  onClick,
  name,
  image,
  className,
}: ItemCellProps) => {
  return (
    <div onClick={onClick}>
      <div
        className={`flex items-center justify-center w-16 h-16 rounded-sm bg-catch-gray-000 ${className}`}
      >
        {image ? (
          <img src={image} alt={name} className="object-contain w-12 h-12" />
        ) : null}
      </div>
    </div>
  );
};
