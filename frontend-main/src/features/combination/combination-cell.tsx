// src/shared/components/atoms/item-cell
import { ItemType, ItemGrade, Season } from "@/app/types/common";

interface ItemCellProps {
  onClick?: () => void;
  id?: number;
  index?: number;
  name: string;
  type: ItemType | "unknown";
  grade?: ItemGrade;
  skill?: string;
  season?: Season;
  description?: string;
  image?: string;
  durability?: number;
  className?: string;
}

export const CombinationCell = ({
  onClick,
  name,
  image,
  className,
}: ItemCellProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-center p-[6px] rounded-lg bg-gradient-to-br w-[100px] h-[100px] from-gray-100 to-gray-400 ${className}`}
    >
      <div
        className={`rounded-md flex items-center w-full h-full justify-center bg-white `}
      >
        {image ? (
          <img src={image} alt={name} className="object-contain w-12 h-12" />
        ) : null}
      </div>
    </div>
  );
};
