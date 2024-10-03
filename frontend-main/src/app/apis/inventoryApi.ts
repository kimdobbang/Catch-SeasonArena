// src/app/api/inventoryApi.ts
// Api: API 호출과 서버 통신 책임, 데이터 통신(여기서 상태관리x)
import config from "@/config";

export const fetchItems = async () => {
  const response = await fetch("/api/auth/inventories/items");
  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }

  return response.json();
};

export const fetchUserItems = async (accessToken: string): Promise<> => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/auth/inventories/items`,
    {
      headers: {
        method: "GET",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("아이템을 가져오는 데 실패했습니다.");
  }

  return response.json();
};
