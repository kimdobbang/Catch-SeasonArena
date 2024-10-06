// src/features/inventory/inventory.tsx
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { ItemLibrary } from "@entities/index";
import { InventoryUserInfo } from "@/features/index";
import { BottomNavBar } from "@ui/index";
import { fetchUserItems } from "@/app/apis/inventoryApi";
import { Item } from "@/app/types/common";

export const Inventory = () => {
  const [items, setItems] = useState<Item[]>([]);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const fetchedItems = await fetchUserItems(accessToken);
        setItems(fetchedItems);
      } catch (error) {
        console.error("아이템을 가져오는 데 실패했습니다.", error);
      }
    };

    if (accessToken) {
      loadItems();
    }
  }, []);

  return (
    <div className="w-full h-full">
      <InventoryUserInfo items={items} />
      <ItemLibrary items={items}>
        <BottomNavBar />
      </ItemLibrary>
    </div>
  );
};

// 인벤토리 들어왔다가 나갈때 ?? redux에 장착 아이템 변경 필요할 것 같은가? 정합성 때문엥? 좀 생각해보기
