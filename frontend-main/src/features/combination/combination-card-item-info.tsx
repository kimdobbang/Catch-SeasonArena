import { Body1Text, Caption1Text, AutumnItemImage } from "@atoms/index";
import { Line } from "@ui/index";
import { Item } from "@/app/types/common";

// 컴포넌트: 아이템 정보 섹션
export const CombinationCardItemInfo = ({
  item,
  maxDurability,
}: {
  item: Item;
  maxDurability: number;
}) => (
  <div className="h-[60%] w-full flex flex-col justify-center gap-2 items-center">
    <div className="w-[100px] h-[100px] rounded-xl flex items-center justify-center">
      <AutumnItemImage itemId={item.itemId} />
    </div>
    <Body1Text className="!text-catch-gray-300">{item.name}</Body1Text>
    <Line className="bg-catch-gray-200" />
    <Caption1Text>
      {item.durability}/{maxDurability} hp
    </Caption1Text>
  </div>
);
