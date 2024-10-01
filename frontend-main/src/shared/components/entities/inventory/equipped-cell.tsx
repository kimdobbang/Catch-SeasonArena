// # 선택 아이템 들어갈 칸(2개 붙으면 합성창, 3개 붙으면 장비창 됨)
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { ItemType, itemTypeNames } from "@/app/types/common";
import { Caption2Text } from "../../atoms";

interface EquippedCellProps {
  itemType: ItemType;
  showCaption: boolean;
}

export const EquippedCell: React.FC<EquippedCellProps> = ({
  itemType,
  showCaption,
}) => {
  const equipments = useSelector((state: RootState) => state.user.equipment);
  const equippedItem = equipments[itemType];

  return (
    <div>
      <div className="flex items-center justify-center w-10 h-10 bg-transparent border-4 border-catch-gray-300">
        <div>{equippedItem !== null ? `${equippedItem}` : "노템"}</div>
      </div>
      {showCaption && (
        <div className="mt-1 text-xs text-center text-gray-500">
          <Caption2Text>{itemTypeNames[itemType]}</Caption2Text>
        </div>
      )}
    </div>
  );
};
