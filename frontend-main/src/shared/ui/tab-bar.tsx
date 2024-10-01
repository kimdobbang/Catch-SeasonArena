import { useState } from "react";
import { seasonNames, itemTypeNames } from "@/app/types/common";

type CategoryType = "Season" | "ItemType";

interface TabBarProps {
  categoryType: CategoryType;
  onCategoryChange?: (category: string) => void;
}

export const TabBar = ({ categoryType, onCategoryChange }: TabBarProps) => {
  const categories = categoryType === "Season" ? seasonNames : itemTypeNames;

  const [activeTab, setActiveTab] = useState<string>(
    Object.keys(categories)[0],
  );

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (onCategoryChange) {
      onCategoryChange(tab);
    }
  };

  return (
    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
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
