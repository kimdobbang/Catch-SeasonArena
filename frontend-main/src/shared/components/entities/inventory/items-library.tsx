//src/shared/components/entities/inventory/item0library.tsx
import React, { useState, useEffect, useCallback } from "react";
import { Item, generateItemImagePath } from "@/app/types/common";
import { ItemCell } from "@entities/index";
import { TabBar, NumberPagination } from "@ui/index";
import { useItemFilter } from "@/features/index";

const MemoizedTabBar = React.memo(TabBar);

export const ItemLibrary = ({ children }: { children?: React.ReactNode }) => {
  const itemsPerPage = 8;
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("weapon");

  useEffect(() => {
    const loadItems = async () => {
      // API 요청 로직 추가 후 하드코딩 제거
      // const response = await fetch("/api/auth/inventories/items");
      // const data = await fetchItems();
      // const data = await response.json();
      // const data: Item[] = [
      //   /* API 데이터 로드 */
      // ];
      const data: Item[] = [
        {
          id: 1,
          itemId: 1,
          name: "메이플 창",
          type: "weapon",
          grade: "rare",
          skill: "사거리+30%",
          season: "autumn",
          description: "단풍잎",
          image: "",
          durability: 10,
        },
        {
          id: 2,
          itemId: 2,
          name: "잭오랜턴",
          type: "passive",
          grade: "normal",
          skill: "피해 감소+20%",
          season: "autumn",
          description: "호박",
          image: "",
          durability: 5,
        },
        {
          id: 3,
          itemId: 3,
          name: "솔 폭탄",
          type: "active",
          grade: "legend",
          skill: "설치 형 폭탄",
          season: "autumn",
          description: "솔방울",
          image: "",
          durability: 15,
        },
        {
          id: 4,
          itemId: 4,
          name: "드래곤플라이",
          type: "active",
          grade: "legend",
          skill: "자기장 내 랜덤 순간이동",
          season: "autumn",
          description: "잠자리",
          image: "",
          durability: 15,
        },
        {
          id: 5,
          itemId: 5,
          name: "코스모 완드",
          type: "weapon",
          grade: "legend",
          skill: "뒤로 넉백 +100%",
          season: "autumn",
          description: "코스모스",
          image: "",
          durability: 15,
        },
        {
          id: 6,
          itemId: 6,
          name: "곰",
          type: "passive",
          grade: "rare",
          skill: "체력 증가+100% 크기증가 30%",
          season: "autumn",
          description: "곰",
          image: "",
          durability: 10,
        },
        {
          id: 7,
          itemId: 7,
          name: "뚜기 점프",
          type: "active",
          grade: "legend",
          skill: "대시 공격 속박 0.5초",
          season: "autumn",
          description: "메뚜기",
          image: "7_active_뚜기점프",
          durability: 15,
        },
        {
          id: 8,
          itemId: 8,
          name: "버섯",
          type: "active",
          grade: "normal",
          skill: "원형 공격",
          season: "autumn",
          description: "버섯",
          image: "8_active_버섯",
          durability: 5,
        },
        {
          id: 9,
          itemId: 9,
          name: "황금 옥수수",
          type: "weapon",
          grade: "rare",
          skill: "속박 0.5초 넉백 50%",
          season: "autumn",
          description: "옥수수",
          image: "9_weapon_황금옥수수",
          durability: 10,
        },
        {
          id: 10,
          itemId: 10,
          name: "다라미",
          type: "passive",
          grade: "normal",
          skill: "이속+15%",
          season: "autumn",
          description: "다람쥐",
          image: "10_passive_다라미",
          durability: 5,
        },
        {
          id: 11,
          itemId: 11,
          name: "갤럭시 문",
          type: "active",
          grade: "legend",
          skill: "미니맵 전체 보기, 카서스궁",
          season: "autumn",
          description: "보름달",
          image: "11_active_갤럭시문",
          durability: 15,
        },
        {
          id: 12,
          itemId: 12,
          name: "허수아비",
          type: "active",
          grade: "legend",
          skill: "허수아비로 변신",
          season: "autumn",
          description: "허수아비",
          image: "",
          durability: 15,
        },
        {
          id: 13,
          itemId: 1,
          name: "메이플 창",
          type: "weapon",
          grade: "rare",
          skill: "사거리+30%",
          season: "autumn",
          description: "단풍잎",
          image: "",
          durability: 10,
        },
        {
          id: 14,
          itemId: 2,
          name: "황금 옥수수",
          type: "weapon",
          grade: "rare",
          skill: "속박 0.5초 넉백 50%",
          season: "autumn",
          description: "옥수수",
          image: "14_weapon_황금옥수수",
          durability: 10,
        },
        {
          id: 15,
          itemId: 3,
          name: "메이플 창",
          type: "weapon",
          grade: "rare",
          skill: "사거리+30%",
          season: "autumn",
          description: "단풍잎",
          image: "1_weapon_메이플창",
          durability: 10,
        },
        {
          id: 16,
          itemId: 4,
          name: "잭오랜턴",
          type: "passive",
          grade: "normal",
          skill: "피해 감소+20%",
          season: "autumn",
          description: "호박",
          image: "2_passive_잭오랜턴",
          durability: 5,
        },
        {
          id: 17,
          itemId: 5,
          name: "솔 폭탄",
          type: "active",
          grade: "legend",
          skill: "설치 형 폭탄",
          season: "autumn",
          description: "솔방울",
          image: "3_active_솔폭탄",
          durability: 15,
        },
        {
          id: 18,
          itemId: 6,
          name: "드래곤플라이",
          type: "active",
          grade: "legend",
          skill: "자기장 내 랜덤 순간이동",
          season: "autumn",
          description: "잠자리",
          image: "4_active_드래곤플라이",
          durability: 15,
        },
        {
          id: 19,
          itemId: 7,
          name: "코스모 완드",
          type: "weapon",
          grade: "legend",
          skill: "뒤로 넉백 +100%",
          season: "autumn",
          description: "코스모스",
          image: "5_weapon_코스모완드",
          durability: 15,
        },
        {
          id: 20,
          itemId: 8,
          name: "곰",
          type: "passive",
          grade: "rare",
          skill: "체력 증가+100% 크기증가 30%",
          season: "autumn",
          description: "곰",
          image: "6_passive_곰",
          durability: 10,
        },
        {
          id: 21,
          itemId: 9,
          name: "뚜기 점프",
          type: "active",
          grade: "legend",
          skill: "대시 공격 속박 0.5초",
          season: "autumn",
          description: "메뚜기",
          image: "7_active_뚜기점프",
          durability: 15,
        },
        {
          id: 22,
          itemId: 10,
          name: "버섯",
          type: "active",
          grade: "normal",
          skill: "원형 공격",
          season: "autumn",
          description: "버섯",
          image: "8_active_버섯",
          durability: 5,
        },
        {
          id: 23,
          itemId: 11,
          name: "황금 옥수수",
          type: "weapon",
          grade: "rare",
          skill: "속박 0.5초 넉백 50%",
          season: "autumn",
          description: "옥수수",
          image: "9_weapon_황금옥수수",
          durability: 10,
        },
        {
          id: 24,
          itemId: 12,
          name: "다라미",
          type: "passive",
          grade: "normal",
          skill: "이속+15%",
          season: "autumn",
          description: "다람쥐",
          image: "10_passive_다라미",
          durability: 5,
        },
      ];
      const itemsWithImages = data.map((item) => ({
        ...item,
        image: generateItemImagePath(item.itemId),
      }));

      setItems(itemsWithImages);
    };

    loadItems();
  }, []);

  const { currentItems, totalPages } = useItemFilter(
    items,
    selectedCategory,
    currentPage,
    itemsPerPage,
  );

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  }, []);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [currentPage, totalPages]);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }, [currentPage]);

  return (
    <div>
      {/* TabBar는 배경색 없이 별도로 */}
      <MemoizedTabBar
        categoryType="ItemType"
        onCategoryChange={handleCategoryChange}
      />

      {/* TabBar 아래 영역에만 배경색을 적용하고 pt로 상단 공백을 줌 */}
      <div className="pt-6 bg-catch-sub-100">
        <div className="grid grid-cols-4 grid-rows-2 gap-4 mx-6">
          {currentItems.map((itemData) => (
            <ItemCell
              id={itemData.id}
              name={itemData.name}
              image={itemData.image}
              type={itemData.type}
            />
          ))}
        </div>

        <NumberPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
        />
        {children}
      </div>
    </div>
  );
};
