// src/app/api/inventoryApi.ts
// Api: API 호출과 서버 통신 책임, 데이터 통신(여기서 상태관리x)
import { Item, generateItemImagePath } from "@/app/types/common";
import config from "@/config";

interface InventoryItem {
  id: number;
  findInventoriesItemResponseDto: Item;
  durability: number;
}

export const fetchUserItems = async (accessToken: string): Promise<Item[]> => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/auth/inventories/items`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("인벤토리 조회 실패");
  }
  const data = await response.json();

  return data.data.map((inventoryItem: InventoryItem) => {
    const itemDto = inventoryItem.findInventoriesItemResponseDto;

    return {
      ...itemDto,
      id: inventoryItem.id,
      itemId: itemDto.id,
      type: itemDto.type.toLowerCase(),
      grade: itemDto.grade.toLowerCase(),
      season: itemDto.season.toLowerCase(),
      image: generateItemImagePath(itemDto.id),
      durability: inventoryItem.durability,
    };
  });
};