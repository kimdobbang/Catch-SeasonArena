// 책임 분리
// 각 컴포넌트: 상태관리, 스토리지 관리, API 처리 책임
// Api: API 호출과 서버 통신 책임, 데이터 통신(여기서 상태관리x)

import config from "@/config";
import { generateItemImagePath, ItemGrade, Season } from "@/app/types/common";

export interface CollectionbookItem {
  item: {
    id: number;
    name: string;
    season: Season;
    description: string;
    image: string;
    grade: ItemGrade;
  };
  createdAt: string | null;
  count: number;
}

export const fetchUserCollectionbookItems = async (
  accessToken: string,
): Promise<CollectionbookItem[]> => {
  const response = await fetch(`${config.API_BASE_URL}/api/auth/dictionaries`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("도감 조회 실패");
  }
  const data = await response.json();

  return data.data.map((collectionbookItem: CollectionbookItem) => {
    const item = collectionbookItem.item;
    return {
      item: {
        id: item.id,
        name: item.name,
        season: item.season.toLowerCase(),
        description: item.description,
        image: generateItemImagePath(
          collectionbookItem.count === 0 ? item.id + 100 : item.id,
        ),
        grade: item.grade.toLowerCase(),
      },
      createdAt: collectionbookItem.createdAt,
      count: collectionbookItem.count,
    };
  });
};
