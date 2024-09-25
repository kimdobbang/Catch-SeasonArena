import React, { useState } from "react";
// 한글 이름 매핑을 포함하여 데이터를 가져옵니다
import { seasonNames, itemTypeNames } from "@/app/types/common"; // 경로는 프로젝트 구조에 맞게 조정하세요

type CategoryType = "Season" | "ItemType";

interface TabBarProps {
  categoryType: CategoryType; // 'Season' 또는 'ItemType' 선택
}

export const TabBar: React.FC<TabBarProps> = ({ categoryType }) => {
  // 카테고리를 season 또는 itemType으로 설정
  const categories = categoryType === "Season" ? seasonNames : itemTypeNames;

  const [activeTab, setActiveTab] = useState<string>(
    Object.keys(categories)[0],
  );

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
      <ul className="flex justify-between w-full -mb-px">
        {Object.keys(categories).map((category) => (
          <li key={category} className="flex-grow">
            <button
              onClick={() => handleTabClick(category)}
              className={`w-full p-4 border-b-2 rounded-t-lg transition-all duration-500 ease-in-out ${
                activeTab === category
                  ? "text-catch-main-400 border-catch-main-400"
                  : "text-gray-500 border-transparent"
              }`}
              style={{
                transition:
                  "border-color 0.5s ease-in-out, color 0.5s ease-in-out",
              }}
            >
              {categories[category as keyof typeof categories]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
