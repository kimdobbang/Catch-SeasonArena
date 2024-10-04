// src/shared/components/entities/inventory/equipped-cell.tsx
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { ItemType, itemTypeNames } from "@/app/types/common";
import { AutumnItemImage, EquipmentItemCaption } from "@atoms/index";

interface EquippedCellProps {
  itemType: ItemType;
  showCaption: boolean;
  size?: "small" | "default";
  onClick?: () => void;
}

export const EquippedCell = ({
  itemType,
  showCaption,
  size = "default",
  onClick,
}: EquippedCellProps) => {
  const equippedItem = useSelector(
    (state: RootState) => state.user.equipment?.[itemType] as number | null,
  );

  const sizeStyles = {
    small: "h-[30px] w-[30px] rounded-xs",
    default: "h-[44px] w-[44px] rounded-md",
  };

  const sizeStyle = sizeStyles[size] || sizeStyles.default;

  return (
    <div className="h-auto" onClick={onClick}>
      <div
        className={`flex items-center justify-center p-[3px] rounded-md bg-gradient-to-br from-gray-100 to-gray-400 ${sizeStyle}`}
      >
        <div className="flex items-center justify-center w-full h-full rounded-sm bg-catch-gray-100">
          {equippedItem !== null ? (
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
