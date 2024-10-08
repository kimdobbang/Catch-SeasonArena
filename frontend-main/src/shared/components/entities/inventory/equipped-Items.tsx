// src/shared/components/entities/inventory/EquippedItems
import { useState, useMemo, useCallback } from "react";
import { EquippedCell, InventoryItemCard } from "@entities/index";
import { Item } from "@/app/types/common";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

export const EquippedItems = ({
  items = [],
  showCaption = true,
}: {
  items?: Item[]; // API로 가져온 items 배열 (optional로 변경)
  showCaption: boolean;
}) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const equippedItems = useSelector((state: RootState) => state.user.equipment);

  // items 배열이 존재할 때만 매칭 아이템을 가져옴
  const getEquippedItem = useCallback(
    (inventoryId: number | null) => {
      return items?.find((item) => item.inventoryId === inventoryId) || null;
    },
    [items],
  );

  const handleItemClick = useCallback((item: Item | null) => {
    if (item) {
      setSelectedItem(item);
      setIsModalOpen(true);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedItem(null);
  }, []);

  const equippedItemList = useMemo(
    () =>
      ["weapon", "active", "passive"].map((type) => ({
        type,
        equippedItem: equippedItems[type as keyof typeof equippedItems],
        matchedItem: getEquippedItem(
          equippedItems[type as keyof typeof equippedItems]?.inventoryId,
        ),
      })),
    [equippedItems, getEquippedItem],
  );

  return (
    <div className="flex justify-around">
      {equippedItemList.map(({ type, equippedItem, matchedItem }) => (
        <EquippedCell
          key={equippedItem.inventoryId}
          inventoryId={equippedItem?.inventoryId ?? null}
          itemId={equippedItem?.itemId ?? null}
          itemType={type as keyof typeof equippedItems}
          showCaption={showCaption}
          // 클릭 이벤트는 items 배열이 있을 때만 적용
          onClick={
            items && matchedItem
              ? () => handleItemClick(matchedItem)
              : undefined
          }
        />
      ))}

      {isModalOpen && selectedItem && (
        <InventoryItemCard item={selectedItem} onClose={handleCloseModal} />
      )}
    </div>
  );
};
