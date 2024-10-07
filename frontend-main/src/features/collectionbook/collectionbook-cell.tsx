// src/shared/components/atoms/item-cell
import { ItemType, ItemGrade, Season } from "@/app/types/common";
import { Caption2Text } from "@/shared/components/atoms/texts/caption2-text";

interface ItemCellProps {
  onClick?: () => void;
  id: number;
  index?: number;
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

export const CollectionbookCell = ({
  onClick,
  name,
  image,
  className,
  id,
}: ItemCellProps) => {
  return (
    <div onClick={id < 100 ? onClick : undefined}>
      <div
        className={`flex items-center justify-center w-16 h-24 rounded-sm bg-catch-gray-000 ${className}`}
      >
        {image ? (
          <img src={image} alt={name} className="object-contain w-12 h-12" />
        ) : (
          <Caption2Text>soon..</Caption2Text>
        )}
      </div>
    </div>
  );
};
