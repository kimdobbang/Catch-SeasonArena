//src/shared/components/entities/inventory/items-library.tsx
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { Item } from "@/app/types/common";
import { ItemCell } from "@atoms/index";
import { TabBar, NumberPagination } from "@ui/index";
import { useItemFilter } from "@/features/index";
import { fetchUserItems } from "@/app/apis/inventoryApi";
import { RootState } from "@/app/redux/store";

const MemoizedTabBar = React.memo(TabBar);

export const ItemLibrary = ({ children }: { children?: React.ReactNode }) => {
  const itemsPerPage = 8;
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("weapon");

  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

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
    <div className="flex flex-col">
      <MemoizedTabBar
        categoryType="ItemType"
        onCategoryChange={handleCategoryChange}
      />

      <div className="pt-6 bg-catch-sub-100">
        <div className="grid grid-cols-4 gap-4 mx-6 h-44">
          {currentItems.map((itemData) => (
            <ItemCell
              key={itemData.id}
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
