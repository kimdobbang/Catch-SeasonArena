// src/shared/components/entities/inventory/equipped-cell.tsx
import { ItemType, itemTypeNames } from "@/app/types/common";
import { AutumnItemImage, EquipmentItemCaption } from "@atoms/index";

interface EquippedCellProps {
  inventoryId: number | null;
  itemId: number | null;
  itemType: ItemType;
  showCaption: boolean;
  size?: "small" | "default";
  onClick?: () => void;
}

// 장착된 아이템을 개별적으로 렌더링하는 셀 컴포넌트
export const EquippedCell = ({
  // inventoryId,
  itemId,
  itemType,
  showCaption,
  size = "default",
  onClick,
}: EquippedCellProps) => {
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
          {itemId !== null ? <AutumnItemImage itemId={itemId} /> : null}
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
