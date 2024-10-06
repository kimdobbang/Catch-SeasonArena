// src/features/inventory/inventory-userinfo.tsx
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Item } from "@/app/types/common";
import { getTierByRating } from "@/app/types/tier";
import { AvatarBody, TierBadge, Body1Text } from "@atoms/index";
import { EquippedItems } from "@entities/index";
import { InGameStats } from "@/features/index";

interface InventoryUserInfoProps {
  items: Item[];
}

export const InventoryUserInfo = ({ items }: InventoryUserInfoProps) => {
  const { selectedAvatar, rating } = useSelector(
    (state: RootState) => state.user,
  );

  const userTier = getTierByRating(rating);

  return (
    <div className="flex items-center h-[30%]">
      <div className="w-[30%]">
        <AvatarBody number={selectedAvatar} height={200} width={200} />
      </div>

      <div className="w-full ml-10 ">
        <div className="flex items-center">
          <TierBadge rating={rating} />
          <Body1Text className=" text-catch-gray-500">{userTier}</Body1Text>
        </div>
        <InGameStats />
        <EquippedItems
          showCaption={true}
          equippedItems={{
            weapon:
              items.find((item) => item.type === "weapon" && item.isEquipped) ||
              null,
            active:
              items.find((item) => item.type === "active" && item.isEquipped) ||
              null,
            passive:
              items.find(
                (item) => item.type === "passive" && item.isEquipped,
              ) || null,
          }}
        />
      </div>
    </div>
  );
};
