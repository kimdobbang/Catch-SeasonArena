import { ItemCell } from "@/shared/components/entities/inventory/item-cell";
import { TabBar } from "@/shared/ui";

export const Inventory = () => {
  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-around ">
        <div className="font-pretendard text-sub2">유저아바타</div>
        <div className="ml-9">
          <div className="font-pretendard text-sub2">유저정보</div>
          <div className="flex">
            <div>티어 뱃지</div>
            <div>티어 text</div>
          </div>
          <div className="flex-col">
            <div className="font-pretendard text-sub2">인게임 스탯</div>
            <div>체력 스탯 기본100 스탯</div>
            <div>공격력 스탯 기본10 </div>
            <div>속도 스탯 기본10</div>
          </div>
        </div>
      </div>
      <TabBar categoryType="ItemType" />
      <TabBar categoryType="Season" />
      <div>
        아이템창
        <div>
          <div className="text-catch-sub-100">아이템창 배경색</div>
          <div className="flex">
            <ItemCell item="코스모완드" season="autumn" itemType="weapon" />
            <ItemCell item="아이템1" season="autumn" itemType="passive" />
            <ItemCell item="아이템2" season="autumn" itemType="active" />
            <ItemCell item="아이템3" season="autumn" itemType="weapon" />
            <ItemCell item="아이템1" season="autumn" itemType="passive" />
            <ItemCell item="아이템2" season="autumn" itemType="active" />
            <ItemCell item="아이템3" season="autumn" itemType="weapon" />
          </div>
        </div>
      </div>
    </div>
  );
};
