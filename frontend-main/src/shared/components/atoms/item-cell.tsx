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

export const ItemCell = ({ onClick, name, type, image }: ItemCellProps) => {
  return (
    <div onClick={onClick}>
      <div className="flex items-center justify-center w-8 h-8">{image}</div>
      <div>
        <div>{type}</div>
        <p>{name}</p>
      </div>
    </div>
  );
};
