import { ItemCell, PrimaryButton } from "@/shared/components/atoms";
import { TabBar } from "@/shared/ui";
import { EquippedCell } from "@/shared/components/entities";
import Plus from "@/assets/icons/plus.svg?react";
import { useState } from "react";

export const Combination = () => {
  // 아이템 배열(백에서 받아야함)
  const items = [
    { item: "코스모완드", season: "autumn", itemType: "weapon" },
    { item: "아이템1", season: "autumn", itemType: "passive" },
    { item: "아이템2", season: "autumn", itemType: "active" },
    { item: "아이템3", season: "autumn", itemType: "weapon" },
    { item: "아이템4", season: "autumn", itemType: "passive" },
    { item: "아이템5", season: "autumn", itemType: "active" },
    { item: "아이템6", season: "autumn", itemType: "weapon" },
    { item: "아이템7", season: "autumn", itemType: "passive" },
    { item: "아이템8", season: "autumn", itemType: "passive" },
    { item: "아이템9", season: "autumn", itemType: "weapon" },
    { item: "아이템10", season: "autumn", itemType: "active" },
    { item: "코스모완드", season: "autumn", itemType: "weapon" },
    { item: "아이템1", season: "autumn", itemType: "passive" },
    { item: "아이템2", season: "autumn", itemType: "active" },
    { item: "아이템3", season: "autumn", itemType: "weapon" },
    { item: "아이템4", season: "autumn", itemType: "passive" },
    { item: "아이템5", season: "autumn", itemType: "active" },
    { item: "아이템6", season: "autumn", itemType: "weapon" },
    { item: "아이템7", season: "autumn", itemType: "passive" },
    { item: "아이템8", season: "autumn", itemType: "passive" },
    { item: "아이템9", season: "autumn", itemType: "weapon" },
    { item: "아이템10", season: "autumn", itemType: "active" },
    { item: "코스모완드", season: "autumn", itemType: "weapon" },
    { item: "아이템1", season: "autumn", itemType: "passive" },
    { item: "아이템2", season: "autumn", itemType: "active" },
    { item: "아이템3", season: "autumn", itemType: "weapon" },
    { item: "아이템4", season: "autumn", itemType: "passive" },
    { item: "아이템5", season: "autumn", itemType: "active" },
    { item: "아이템6", season: "autumn", itemType: "weapon" },
    { item: "아이템7", season: "autumn", itemType: "passive" },
    { item: "아이템8", season: "autumn", itemType: "passive" },
    { item: "아이템9", season: "autumn", itemType: "weapon" },
    { item: "아이템10", season: "autumn", itemType: "active" },
  ];

  const itemsPerPage = 8;

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedCategory, setSelectedCategory] = useState("weapon");

  const filteredItems = items.filter(
    (item) => item.season === selectedCategory,
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleCombine = () => {
    // 합성 api 실행
    console.log("합성하기 api 실행");
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleTabChange = (tab: string) => {
    setSelectedCategory(tab);
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-[30%] flex flex-col">
        <div className="flex items-center flex-row justify-center gap-5 w-full h-[70%]">
          <EquippedCell itemType="weapon" showCaption={false} size="big" />
          <Plus />
          <EquippedCell itemType="weapon" showCaption={false} size="big" />
        </div>
        <div className="flex flex-row w-full h-[30%] justify-center items-center">
          <PrimaryButton
            color="main"
            size="small"
            showIcon={false}
            onClick={handleCombine}
          >
            합성하기
          </PrimaryButton>
        </div>
      </div>
      <div className="w-full h-[70%]">
        <TabBar categoryType="Season" onCategoryChange={handleTabChange} />
        <div className="bg-catch-sub-100">
          <div className="grid grid-cols-4 grid-rows-2 gap-4 mx-6">
            {currentItems.map((itemData, index) => (
              <ItemCell
                key={index}
                item={itemData.item}
                season={itemData.season}
                itemType={itemData.itemType}
              />
            ))}
          </div>
          {/* 페이지네이션 버튼 */}
          <div className="flex justify-center mt-4">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              이전
            </button>
            <div className="justify-center mx-3 felx">
              {currentPage} / {totalPages}
            </div>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
