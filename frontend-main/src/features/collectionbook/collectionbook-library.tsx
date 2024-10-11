import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { TabBar } from "@ui/index";
import { CollectionbookCell } from "./collectionbook-cell";
import {
  CollectionbookItem,
  fetchUserCollectionbookItems,
} from "@/app/apis/collectionbook-api";
import { useCollectionbookSeasonFilter } from "@/app/hooks/use-collectionbook-season-filter";
import { CollectionbookItemCard } from "./collectionbook-item-card";
import { Season } from "@/app/types/common";

const MemoizedTabBar = React.memo(TabBar);

export const CollectionbookLibrary = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const itemsPerPage = 16;
  const [items, setItems] = useState<CollectionbookItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("autumn"); // 계절 필터링 기본값
  const [selectedItem, setSelectedItem] = useState<CollectionbookItem | null>(
    null,
  ); // 선택된 아이템 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태

  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const fillEmptyItems = (items: CollectionbookItem[], totalItems: number) => {
    const filledItems = [...items];
    const missingItemsCount = totalItems - items.length;
    for (let i = 0; i < missingItemsCount; i++) {
      filledItems.push({
        item: {
          id: 1000 + i,
          name: "Empty Item",
          season: "autumn",
          description: "This is an empty slot.",
          image: "",
          grade: "legend",
        },
        createdAt: null,
        count: 0,
      });
    }
    const restSeasons: Season[] = ["spring", "summer", "winter"];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 16; j++) {
        filledItems.push({
          item: {
            id: 1000 + j,
            name: "Empty Item",
            season: restSeasons[i],
            description: "This is an empty slot.",
            image: "",
            grade: "legend",
          },
          createdAt: null,
          count: 0,
        });
      }
    }
    return filledItems;
  };

  useEffect(() => {
    const loadItems = async () => {
      try {
        const fetchedItems = await fetchUserCollectionbookItems(accessToken);
        const fullItems = fillEmptyItems([...fetchedItems], itemsPerPage);
        setItems(fullItems);
        console.log(fetchedItems);
      } catch (error) {
        console.error("도감을 가져오는 데 실패했습니다.", error);
      }
    };

    if (accessToken) {
      loadItems();
    }
  }, []);

  const { currentItems } = useCollectionbookSeasonFilter(
    items,
    selectedCategory,
    1,
    itemsPerPage,
  );

  const handleCategoryChange = useCallback((season: string) => {
    setSelectedCategory(season);
  }, []);

  const handleItemClick = (item: CollectionbookItem) => {
    setSelectedItem(item); // 선택된 아이템 설정
    setIsModalOpen(true); // 모달 열기
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
    setSelectedItem(null); // 선택된 아이템 초기화
  };

  return (
    <div className="flex flex-col w-full h-full">
      <MemoizedTabBar
        categoryType="Season"
        onCategoryChange={handleCategoryChange}
      />

      <div className="w-full h-full pt-6 bg-catch-sub-100">
        <div className="grid h-[75%] grid-cols-4 gap-4 mx-6">
          {currentItems.map((itemData) => (
            <CollectionbookCell
              key={itemData.item.id}
              id={itemData.item.id}
              name={itemData.item.name}
              image={itemData.item.image}
              onClick={() => handleItemClick(itemData)}
            />
          ))}
        </div>
        {children}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-40 bg-opacity-50 backdrop-blur-sm"></div>
      )}
      {isModalOpen && selectedItem && (
        <CollectionbookItemCard
          item={selectedItem}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
