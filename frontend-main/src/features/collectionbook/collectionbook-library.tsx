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

const MemoizedTabBar = React.memo(TabBar);

export const CollectionbookLibrary = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const itemsPerPage = 16;
  const [items, setItems] = useState<CollectionbookItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("autumn"); // 계절 필터링 기본값

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

  return (
    <div className="flex flex-col">
      <MemoizedTabBar
        categoryType="Season"
        onCategoryChange={handleCategoryChange}
      />

      <div className="pt-6 bg-catch-sub-100">
        <div className="grid h-full grid-cols-4 gap-4 mx-6">
          {currentItems.map((itemData) => (
            <CollectionbookCell
              key={itemData.item.id}
              id={itemData.item.id}
              name={itemData.item.name}
              image={itemData.item.image}
            />
          ))}
        </div>
        {children}
      </div>
    </div>
  );
};
