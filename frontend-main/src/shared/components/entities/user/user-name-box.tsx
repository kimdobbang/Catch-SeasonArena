import TierSilver from "@/assets/icons/tier-silver.svg?react";
import Pencil from "@/assets/icons/pencil.svg?react";
import { Body2Text } from "../../atoms";

interface UserNameBoxProps {
  nickname: string;
  rating: number;
  className?: string;
}
export const UserNameBox: React.FC<UserNameBoxProps> = ({
  nickname = "닉네임",
  rating = 800,
  className,
}) => {
  const getTier = () => {
    if (rating < 500) {
      return "BRONZE";
    } else if (rating >= 500 && rating < 1000) {
      return "SILVER";
    } else if (rating >= 1000 && rating < 1500) {
      return "GOLD";
    } else if (rating >= 1500 && rating < 2000) {
      return "PLATINUM";
    } else if (rating >= 2000 && rating < 2500) {
      return "DIAMOND";
    } else if (rating >= 2500 && rating < 3000) {
      return "RUBY";
    } else return "TIER-ERROR";
  };
  return (
    <div
      className={`bg-gradient-to-r p-3 from-catch-sub-300 to-catch-main-400 flex flex-row rounded-xl w-[293px] h-[77px] bg-catch-main-400 ${className}`}
    >
      <div className="w-[20%] h-full flex items-center justify-center">
        <div className="bg-catch-gray-000 rounded-md w-[50px] h-[50px] flex items-center justify-center">
          <TierSilver />
        </div>
      </div>

      <div className="pl-3 w-[70%] h-full flex flex-col justify-center">
        <Body2Text className="!text-left text-white">{nickname}</Body2Text>
        <Body2Text className="!text-left text-white">
          {getTier()} · {rating}
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
