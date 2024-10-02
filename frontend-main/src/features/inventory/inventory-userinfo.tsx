import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { getTierByRating } from "@/app/types/tier";
import { InGameStats } from "@/features/index";
import { EquippedItems } from "@entities/index";
import { AvatarBody } from "@atoms/index";
import { TierBadge } from "@atoms/index";
import { Body1Text } from "@atoms/index";

export const InventoryUserInfo = () => {
  const { selectedAvatar, rating } = useSelector(
    (state: RootState) => state.user,
  );

  const userTier = getTierByRating(rating);

  return (
    <div className="flex items-center h-[45%]">
      <div className="w-[30%]">
        <AvatarBody number={selectedAvatar} height={200} width={200} />
      </div>

      <div className="w-full ml-9 ">
        <div className="flex">
          <TierBadge rating={rating} />
          <Body1Text className="text-catch-tier-Bronze">{userTier}</Body1Text>
        </div>
        <InGameStats />
        <EquippedItems />
      </div>
    </div>
  );
};
