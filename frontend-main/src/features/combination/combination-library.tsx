import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Item } from "@/app/types/common";
import { fetchUserItems } from "@/app/apis/inventoryApi";
import { ItemCell } from "@atoms/index";
import { InventoryItemCard } from "@entities/index";
import { useSeasonFilter } from "@/features/index";
import { TabBar, NumberPagination } from "@ui/index";

const MemoizedTabBar = React.memo(TabBar);

export const CombinationLibrary = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const itemsPerPage = 8;
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("autumn"); // 계절 필터링 기본값
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
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

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

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
              id={itemData.id}
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
        {isModalOpen && selectedItem && (
          <InventoryItemCard item={selectedItem} onClose={handleCloseModal} />
        )}
        {children}
      </div>
    </div>
  );
};
