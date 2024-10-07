// src/components/entities/inventory/equipped-items.tsx
import { useState } from "react";
import { EquippedCell, InventoryItemCard } from "@entities/index";
import { Item } from "@/app/types/common";

interface EquippedItemsProps {
  equippedItems: {
    weapon: Item | null;
    active: Item | null;
    passive: Item | null;
  };
  showCaption: boolean;
}
export const EquippedItems = ({
  equippedItems,
  showCaption = true,
}: EquippedItemsProps) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = (item: Item | null) => {
    if (item) {
      setSelectedItem(item);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="flex justify-around">
      <EquippedCell
        id={equippedItems.weapon?.id ?? null}
        itemId={equippedItems.weapon?.itemId ?? null}
        itemType="weapon"
        showCaption={showCaption}
        onClick={() => handleItemClick(equippedItems.weapon)}
      />
      <EquippedCell
        id={equippedItems.active?.id ?? null}
        itemId={equippedItems.active?.itemId ?? null}
        itemType="active"
        showCaption={showCaption}
        onClick={() => handleItemClick(equippedItems.active)}
      />
      <EquippedCell
        id={equippedItems.passive?.id ?? null}
        itemId={equippedItems.passive?.itemId ?? null}
        itemType="passive"
        showCaption={showCaption}
        onClick={() => handleItemClick(equippedItems.passive)}
      />

      {isModalOpen && selectedItem && (
        <InventoryItemCard item={selectedItem} onClose={handleCloseModal} />
      )}
    </div>
  );
};
