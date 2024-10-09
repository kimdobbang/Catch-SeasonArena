import React, { useState, useCallback } from "react";

import { Item } from "@/app/types/common";
import { ItemCell } from "@atoms/index";
import { useSeasonFilter } from "@/features/index";
import { TabBar, NumberPagination } from "@ui/index";

const MemoizedTabBar = React.memo(TabBar);

export const CombinationLibrary = ({
  children,
  items,
  handleItemClick,
}: {
  children?: React.ReactNode;
  items: Item[];
  handleItemClick: (item: Item) => void;
}) => {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("autumn"); // 계절 필터링 기본값

  const { currentItems, totalPages } = useSeasonFilter(
    items,
    selectedCategory, // 선택된 계절에 맞게 필터링
    currentPage,
    itemsPerPage,
  );

  const handleCategoryChange = useCallback((season: string) => {
    setSelectedCategory(season); // 선택된 계절을 설정
    setCurrentPage(1); // 페이지 초기화
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
        categoryType="Season"
        onCategoryChange={handleCategoryChange} // 계절 변경 핸들러
      />

      <div className="pt-6 bg-catch-sub-100">
        <div className="grid grid-cols-4 gap-4 mx-6 h-44">
          {currentItems.map((itemData) => (
            <ItemCell
              key={itemData.inventoryId}
              inventoryId={itemData.inventoryId}
              itemId={itemData.itemId}
              name={itemData.name}
              image={itemData.image}
              type={itemData.type}
              onClick={() => handleItemClick(itemData)}
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
