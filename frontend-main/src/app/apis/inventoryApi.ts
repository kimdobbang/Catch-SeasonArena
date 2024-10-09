// src/app/api/inventoryApi.ts
// Api: API 호출과 서버 통신 책임, 데이터 통신(여기서 상태관리x)
import { Item, generateItemImagePath } from "@/app/types/common";
import config from "@/config";

interface InventoryItem {
  id: number;
  findInventoriesItemResponseDto: Item;
  durability: number;
  isEquipped: boolean;
}
// 인벤토리 전체조회
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
      inventoryId: inventoryItem.id,
      itemId: itemDto.itemId,
      type: itemDto.type.toLowerCase(),
      grade: itemDto.grade.toLowerCase(),
      season: itemDto.season.toLowerCase(),
      image: generateItemImagePath(itemDto.itemId),
      durability: inventoryItem.durability,
      isEquipped: inventoryItem.isEquipped,
    };
  });
};

// 장착 API 호출 함수
export const equipUserItem = async (
  accessToken: string,
  inventoryId: number,
): Promise<void> => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/auth/inventories/items/equipment/${inventoryId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("아이템 장착 실패");
  }
};

// 해제 API 호출 함수
export const unequipUserItem = async (
  accessToken: string,
  inventoryId: number,
): Promise<void> => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/auth/inventories/items/unequipment/${inventoryId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("아이템 해제 실패");
  }
};

// 아이템 삭제 API 호출 함수
export const deleteUserItem = async (
  accessToken: string,
  inventoryId: number,
): Promise<void> => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/auth/inventories/items/${inventoryId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("아이템 삭제 실패");
  }
};
