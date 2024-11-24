//src/shared/components/entities/inventory/items-library.tsx
import React, { useState, useCallback } from "react";
import { Item } from "@/app/types/common";
import { ItemCell } from "@entities/index";
import { TabBar } from "@ui/index";
import { NumberPagination } from "@widgets/index"
import { useItemFilter } from "@/features/index";
import { InventoryItemCard } from "@entities/index";

const MemoizedTabBar = React.memo(TabBar);

interface ItemLibraryProps {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  children?: React.ReactNode;
}

export const ItemLibrary = ({
  items,
  setItems,
  children,
}: ItemLibraryProps) => {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("weapon");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="flex flex-col h-[70%] w-full justify-center relative ">
      <MemoizedTabBar
        categoryType="ItemType"
        onCategoryChange={handleCategoryChange}
      />
      <div className="w-full h-full pt-6 bg-catch-sub-100">
        <div className="grid grid-cols-4 gap-4 mx-6 h-44">
          {currentItems.map((itemData) => (
            <ItemCell
              key={itemData.inventoryId}
              inventoryId={itemData.inventoryId}
              itemId={itemData.itemId}
              name={itemData.name}
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
        {isModalOpen && (
          <div className="fixed inset-0 z-40 bg-opacity-50 backdrop-blur-sm"></div>
        )}
        {isModalOpen && selectedItem && (
          <InventoryItemCard
            item={selectedItem}
            onClose={handleCloseModal}
            setItems={setItems}
          />
        )}
        {children}
      </div>
    </div>
  );
};
