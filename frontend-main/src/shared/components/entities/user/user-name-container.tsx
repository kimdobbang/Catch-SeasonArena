import Pencil from "@/assets/icons/pencil.svg?react";
import { Body2Text, TierBadge } from "../../atoms";
import { getTierByRating } from "@/app/types/tier";
interface UserNameContainerProps {
  nickname: string;
  rating: number;
  className?: string;
}
export const UserNameContainer = ({
  nickname = "닉네임",
  rating = 800,
  className,
}: UserNameContainerProps) => {
  return (
    <div
      className={`bg-gradient-to-r p-3 from-catch-sub-300 to-catch-main-400 flex flex-row rounded-xl w-[293px] h-[77px] bg-catch-main-400 ${className}`}
    >
      <div className="w-[20%] h-full flex items-center justify-center">
        <TierBadge rating={rating} />
      </div>

      <div className="pl-3 w-[70%] h-full flex flex-col justify-center">
        <Body2Text className="!text-left text-white">{nickname}</Body2Text>
        <Body2Text className="!text-left text-white">
          {getTierByRating(rating)} · {rating}
        </Body2Text>
      </div>
      <div className="w-[10%] h-full flex flex-col justify-start">
        <button>
          <Pencil />
        </button>
      </div>
    </div>
  );
};
