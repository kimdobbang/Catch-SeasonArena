//src/shared/components/entities/inventory/items-library.tsx
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { Item } from "@/app/types/common";
import { ItemCell } from "@atoms/index";
import { TabBar, NumberPagination } from "@ui/index";
import { useItemFilter } from "@/features/index";
import { InventoryItemCard } from "@entities/index";
import { fetchUserItems } from "@/app/apis/inventoryApi";
import { RootState } from "@/app/redux/store";

const MemoizedTabBar = React.memo(TabBar);

export const ItemLibrary = ({ children }: { children?: React.ReactNode }) => {
  const itemsPerPage = 8;
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("weapon");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // 아이템 클릭 시 InventoryItemCard 열기
  const handleItemClick = (item: Item) => {
    console.log("Item clicked:", item); // 클릭 시 로그
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // InventoryItemCard 닫기
  const handleCloseModal = () => {
    console.log("isModalOpen:", isModalOpen); // 모달 상태 로그
    console.log("selectedItem:", selectedItem); // 선택된 아이템 로그
    setIsModalOpen(false);
    setSelectedItem(null); // 선택된 아이템 초기화
  };

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
              id={itemData.id} //id: inventoryItem.id,
              itemId={itemData.itemId} // itemId: itemDto.id,
              name={itemData.name}
              image={itemData.image}
              type={itemData.type}
              onClick={() => handleItemClick(itemData)} // 클릭 시 모달 열기
            />
          ))}
        </div>

        <NumberPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
        />
        {/* InventoryItemCard 렌더링 */}
        {isModalOpen && selectedItem && (
          <InventoryItemCard item={selectedItem} onClose={handleCloseModal} />
        )}
        {children}
      </div>
    </div>
  );
};
