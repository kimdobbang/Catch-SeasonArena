import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { ItemType, itemTypeNames } from "@/app/types/common";
import { Caption2Text } from "../../atoms";

interface EquippedCellProps {
  itemType: ItemType;
  showCaption: boolean;
  size?: "small" | "middle" | "big";
}

export const EquippedCell = ({
  itemType,
  showCaption,
  size,
}: EquippedCellProps) => {
  const equipments = useSelector((state: RootState) => state.user.equipment);
  const equippedItem = equipments[itemType];

  const getSizeStyle = () => {
    switch (size) {
      case "small":
        return "h-[30px] w-[30px] rounded-xs";
      case "middle":
        return "h-[44px] w-[44px] rounded-md";
      case "big":
        return "h-[100px] w-[100px] rounded-md";
      default:
        return "h-[44px] w-[44px] rounded-md";
    }
  };

  return (
    <div className="h-auto">
      <div
        className={`flex items-center justify-center p-1 rounded-md bg-gradient-to-br from-gray-100 to-gray-400 ${getSizeStyle()}`}
      >
        <div
          className={`flex items-center justify-center w-full h-full bg-white rounded-md ${size === "small" ? "rounded-xs" : "rounded-md"}`}
        >
          {equippedItem !== null ? `${equippedItem}` : "노템"}
        </div>
      </div>
      {showCaption && (
        <div className={"mt-1 text-xs text-center text-gray-500"}>
          <Caption2Text>{itemTypeNames[itemType]}</Caption2Text>
        </div>
      )}
    </div>
  );
};
