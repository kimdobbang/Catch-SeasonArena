// src/shared/components/atoms/item-cell
import { ItemType, ItemGrade, Season } from "@/app/types/common";
import { AutumnItemImage } from "@atoms/index";
import { Caption2Text } from "@atoms/index";

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
          <div className="object-contain w-14 h-14">
            <AutumnItemImage itemId={id} key={id} />
          </div>
        ) : (
          <Caption2Text>soon..</Caption2Text>
        )}
      </div>
    </div>
  );
};
