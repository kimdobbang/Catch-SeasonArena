import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import {
  Body1Text,
  Body2Text,
  Caption1Text,
  TierInitial,
} from "@/shared/components/atoms";
import { CircleAvatar } from "@/shared/components/entities";

interface MyRankingBoxProps {
  className?: string;
}
export const MyRankingBox = ({ className }: MyRankingBoxProps) => {
  const user = useSelector((state: RootState) => state.user);
  const rank = 120; //일단 하드코딩함
  const tierRank = 20; //일단 하드코딩함

  const getNickname = () => {
    if (user.nickname) {
      return user.nickname;
    } else return "닉네임";
  };
  return (
    <div
      className={`flex flex-col bg-gradient-to-r from-catch-sub-300 to-catch-main-400 rounded-lg w-[90%] h-[80px] ${className}`}
    >
      <div className=" flex flex-row w-full h-[50%] justify-center items-center">
        <div className="w-[25%] flex flex-row gap-2 items-center justify-center">
          <TierInitial size="small" rating={user.rating} />
          <CircleAvatar
            avatarIcon={false}
            emotion="normal"
            number={user.selectedAvatar}
            height={29}
            width={29}
            className="bg-catch-sub-200 "
          />
        </div>
        <div className="w-[50%]">
          <Body1Text className="mr-2 text-white">{getNickname()}</Body1Text>
        </div>
        <div className="w-[25%]">
          <Caption1Text className="mr-2 text-white">
            {user.rating} Points
          </Caption1Text>
        </div>
      </div>
      <div className="justify-around items-center flex flex-row w-full h-[50%]">
        <Body2Text className="font-bold text-white">Top {rank}위</Body2Text>
        <Body2Text className="font-bold text-white">
          Gold Tier {tierRank}위
        </Body2Text>
      </div>
    </div>
  );
};
