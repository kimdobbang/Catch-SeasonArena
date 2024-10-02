import { ItemType, ItemGrade, Season } from "@/app/types/common";

interface ItemCellProps {
  onClick?: () => void;
  id?: number;
  index?: number;
  name: string;
  type: ItemType;
  grade?: ItemGrade;
  skill?: string;
  season?: Season;
  description?: string;
  image?: string;
  durability?: number;
}

export const ItemCell = ({ onClick, name, image }: ItemCellProps) => {
  return (
    <div onClick={onClick}>
      <div className="flex items-center justify-center w-16 h-16 rounded-sm bg-catch-gray-000">
        {image ? (
          <img src={image} alt={name} className="object-contain w-12 h-12" />
        ) : null}
      </div>
      <div></div>
    </div>
  );
};
