// src/features/inventory/inventory-userinfo.tsx
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Item } from "@/app/types/common";
import { AvatarBody, TierBadge, Body1Text } from "@atoms/index";
import { EquippedItems } from "@entities/index";
import { InGameStats } from "@/features/index";

interface InventoryUserInfoProps {
  items: Item[]; // API로 가져온 items 배열
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

export const InventoryUserInfo = ({
  items,
  setItems,
}: InventoryUserInfoProps) => {
  const { selectedAvatar, rating, tier } = useSelector(
    (state: RootState) => state.user,
  ); // Redux에서 아바타와 티어 정보 가져오기

  return (
    <div className="flex items-center h-[35%]">
      <div className="w-[30%] items-center pr-10">
        <AvatarBody
          number={selectedAvatar}
          height={200}
          width={200}
          className="relative right-6"
        />
      </div>
      <div className="flex flex-col w-full gap-2 ml-10">
        <div className="flex items-center">
          <TierBadge rating={rating} />
          <Body1Text className=" text-catch-gray-500">{tier}</Body1Text>
        </div>
        <InGameStats />
        <EquippedItems items={items} setItems={setItems} showCaption={true} />
      </div>
    </div>
  );
};
