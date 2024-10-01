import { useState } from "react";
import { TierRanking } from "./tier-ranking";
import { TotalRanking } from "./total-ranking";
import { RankingTabButton } from "./ranking-tab-button";
import { Body1Text } from "@/shared/components/atoms";

const tabs = [
  { index: 0, name: "전체 순위", content: <TotalRanking /> },
  { index: 1, name: "티어 순위", content: <TierRanking /> },
];

export const RankingListContainer = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col w-full h-full p-3">
      <div className="flex flex-row h-[10%] items-center">
        <div className="flex flex-row gap-3 h-full w-[50%]">
          {tabs.map((el, idx) => (
            <RankingTabButton
              key={el.index}
              title={el.name}
              isSelected={activeTab === el.index}
              onClick={() => {
                setActiveTab(idx);
              }}
            />
          ))}
        </div>
        <div className="w-[50%] ">
          <Body1Text className="text-catch-main-400">2024 Autumn</Body1Text>
        </div>
      </div>
      <div className="w-full h-[90%]">{tabs[activeTab].content}</div>
    </div>
  );
};
