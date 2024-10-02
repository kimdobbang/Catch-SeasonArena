// src/components/entities/inventory/equipped-items.tsx
import { EquippedCell } from "@entities/index";

interface EquippedItemsProps {
  showCaption: boolean; //
}

export const EquippedItems = ({ showCaption = true }: EquippedItemsProps) => {
  return (
    <div className="flex justify-around">
      <EquippedCell itemType="weapon" showCaption={showCaption} />
      <EquippedCell itemType="active" showCaption={showCaption} />
      <EquippedCell itemType="passive" showCaption={showCaption} />
    </div>
  );
};
