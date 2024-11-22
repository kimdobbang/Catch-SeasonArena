import { useState, useEffect } from "react";
import { seasonNames, itemTypeNames } from "@/app/types/common.ts";

export type CategoryType = "Season" | "ItemType";

interface TabBarProps {
  categoryType: CategoryType;
  onCategoryChange?: (category: string) => void;
  className?: string;
}

export const TabBar = ({
  categoryType,
  onCategoryChange,
  className,
}: TabBarProps) => {
  const categories = categoryType === "Season" ? seasonNames : itemTypeNames;

  const [activeTab, setActiveTab] = useState<string>("");

  // `useEffect`에서 초기 탭을 동적으로 설정
  useEffect(() => {
    if (categoryType === "ItemType") {
      // 첫 번째 아이템 타입으로 초기화
      setActiveTab(Object.keys(categories)[0]);
    } else if (categoryType === "Season") {
      // 첫 번째 계절로 초기화 (autumn 등)
      setActiveTab(Object.keys(categories)[2]);
    }
  }, [categoryType, categories]);

  // 탭을 클릭할 때 실행되는 함수
  const handleTabClick = (tab: string) => {
    setActiveTab(tab); // 클릭한 탭을 활성화
    onCategoryChange?.(tab); // 탭 변경을 부모에게 알림
  };

  return (
    <div
      className={`${className} w-full text-sm font-medium text-center text-gray-500 border-b border-gray-200`}
    >
      <ul className="flex justify-between w-full -mb-px shadow-custom-inset">
        {Object.keys(categories).map((category) => (
          <li key={category} className="flex-grow">
            <button
              onClick={() => handleTabClick(category)}
              className={`w-full pt-4 pb-2 border-b-2 rounded-t-lg transition-all duration-500 ease-in-out ${
                activeTab === category
                  ? "text-catch-main-400 border-catch-main-400"
                  : "text-gray-500 border-transparent"
              }`}
            >
              {categories[category as keyof typeof categories]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
