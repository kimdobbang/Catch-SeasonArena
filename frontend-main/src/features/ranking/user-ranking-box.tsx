import {
  Body1Text,
  Body2Text,
  Caption1Text,
  TierInitial,
} from "@/shared/components/atoms";
import { CircleAvatar } from "@/shared/components/entities";

export interface UserRankingProps {
  nickname: string;
  rating: number;
  rank: number;
  avatar: number;
}

export const UserRankingBox = ({
  nickname,
  rating,
  rank,
  avatar,
}: UserRankingProps) => {
  return (
    <div className="flex flex-row items-center bg-catch-sub-300 rounded-lg w-[90%] h-[45px] ">
      <div className="w-[30%] flex flex-row gap-2 items-center justify-center">
        <TierInitial size="small" rating={rating} />
        <CircleAvatar
          avatarIcon={false}
          emotion="normal"
          number={avatar}
          height={29}
          width={29}
          className="bg-catch-sub-200"
        />
      </div>
      <div className="w-[35%]">
        <Body1Text className="text-white">{nickname}</Body1Text>
      </div>
      <div className="w-[35%] flex flex-row items-center justify-center">
        <Caption1Text className="mr-2 text-white">{rating} </Caption1Text>
        <Caption1Text className="mr-2 text-white"> ·</Caption1Text>
        <Body2Text className="text-white">{rank}위</Body2Text>
      </div>
    </div>
  );
};
