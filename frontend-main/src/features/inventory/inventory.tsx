// src/features/inventory/inventory.tsx
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ItemLibrary } from "@entities/index";
import { CollectTimerModal, InventoryUserInfo } from "@/features/index";
import { BottomNavBar } from "@ui/index";
import { fetchUserItems } from "@/app/apis/inventoryApi";
import { RootState } from "@/app/redux/store";
import { Item } from "@/app/types/common";

export const Inventory = () => {
  const [items, setItems] = useState<Item[]>([]);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [timerModalOpen, setTimerModalOpen] = useState(false);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const fetchedItems = await fetchUserItems(accessToken);
        setItems(fetchedItems);
        console.log(fetchedItems);
      } catch (error) {
        console.error("아이템을 가져오는 데 실패했습니다.", error);
      }
    };

    if (accessToken) {
      loadItems();
    }
  }, []);

  const handleTimerOpenModal = () => {
    setTimerModalOpen(true);
  };
  const handleTimerCloseModal = () => {
    setTimerModalOpen(false);
  };

  return (
    <div className="w-full h-full">
      <InventoryUserInfo items={items} setItems={setItems} />
      <ItemLibrary items={items} setItems={setItems}>
        <BottomNavBar
          onTimerModalOpen={handleTimerOpenModal}
          className="absolute bottom-0 z-10 h-[30%]"
        />
      </ItemLibrary>
      {timerModalOpen && <CollectTimerModal onClose={handleTimerCloseModal} />}
    </div>
  );
};
