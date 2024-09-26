import { useState } from "react";
import { ItemCell } from "@entities/index";
import { TabBar } from "@/shared/ui";

export const ItemLibrary = () => {
  // 아이템 배열
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
    // 필요한 만큼 더 추가 가능
  ];

  // 한 페이지에 보여줄 아이템 수
  const itemsPerPage = 8;

  // 현재 페이지 상태 관리
  const [currentPage, setCurrentPage] = useState(1);

  // 선택된 카테고리 상태 관리
  const [selectedCategory, setSelectedCategory] = useState("weapon");

  // 선택된 카테고리에 맞게 아이템 필터링
  const filteredItems = items.filter(
    (item) => item.itemType === selectedCategory,
  );

  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // 현재 페이지에 해당하는 아이템 슬라이스
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // 페이지 변경 핸들러
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

  // TabBar에서 선택된 카테고리 변경 핸들러
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div>
      {/* TabBar에서 선택된 카테고리를 부모로 전달 */}
      <TabBar categoryType="ItemType" onCategoryChange={handleCategoryChange} />
      <div>
        <div className="grid grid-cols-4 grid-rows-2 gap-4 mx-6">
          {/* 현재 페이지에 맞는 아이템만 렌더링 */}
          {currentItems.map((itemData, index) => (
            <ItemCell
              key={index}
              item={itemData.item}
              season={itemData.season}
              itemType={itemData.itemType}
            />
          ))}
        </div>
      </div>

      {/* 페이지네이션 버튼 */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 ${
            currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
          }`}
        >
          이전
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 ${
            currentPage === totalPages
              ? "bg-gray-300"
              : "bg-blue-500 text-white"
          }`}
        >
          다음
        </button>
      </div>
    </div>
  );
};
