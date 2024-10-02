// src/shared/components/entities/inventory/equipped-cell.tsx
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { ItemType, itemTypeNames } from "@/app/types/common";
import { AutumnItemImage, EquipmentItemCaption } from "@atoms/index";

interface EquippedCellProps {
  itemType: ItemType;
  showCaption: boolean;
  size?: "small" | "middle" | "big";
  onClick?: () => void;
}

export const EquippedCell = ({
  itemType,
  showCaption,
  size = "middle",
  onClick,
}: EquippedCellProps) => {
  const equippedItem = useSelector(
    (state: RootState) => state.user.equipment[itemType],
  );

  const sizeStyles = {
    small: "h-[30px] w-[30px] rounded-xs",
    middle: "h-[44px] w-[44px] rounded-md",
    big: "h-[100px] w-[100px] rounded-md",
    default: "h-[44px] w-[44px] rounded-md",
  };

  const sizeStyle = sizeStyles[size] || sizeStyles.middle;

  return (
    <div className="h-auto" onClick={onClick}>
      <div
        className={`flex items-center justify-center p-[3px] rounded-md bg-gradient-to-br from-gray-100 to-gray-400 ${sizeStyle}`}
      >
        <div className="flex items-center justify-center w-full h-full rounded-sm bg-catch-gray-100">
          {typeof equippedItem === "number" ? (
            <AutumnItemImage itemId={equippedItem} />
          ) : null}
        </div>
      </div>

      {showCaption && (
        <EquipmentItemCaption
          show={showCaption}
          text={itemTypeNames[itemType]}
        />
      )}
    </div>
  );
};
