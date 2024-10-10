import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import {
  Body2Text,
  Caption1Text,
  TierInitial,
} from "@/shared/components/atoms";
import { CircleAvatar } from "@/shared/components/entities";
import { fetchMyRanking, MyRankingProps } from "@/app/apis/rankingApi";
import { useEffect, useState } from "react";
import { getTierByRating } from "@/app/types/tier";

interface MyRankingBoxProps {
  className?: string;
}
export const MyRankingBox = ({ className }: MyRankingBoxProps) => {
  const user = useSelector((state: RootState) => state.user);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [myRanking, setMyRanking] = useState<MyRankingProps | null>(null); // null로 초기화

  useEffect(() => {
    const getUserRank = async () => {
      const myRankings = await fetchMyRanking(accessToken);
      if (myRankings) {
        setMyRanking(myRankings);
      }
    };

    getUserRank();
  }, [accessToken]);

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
          <Body2Text className="mr-2 font-bold text-white">
            {user.nickname}
          </Body2Text>
        </div>
        <div className="w-[25%]">
          <Caption1Text className="mr-2 text-white">
            {user.rating} Points
          </Caption1Text>
        </div>
      </div>
      <div className="justify-around items-center flex flex-row w-full h-[50%]">
        <Body2Text className="font-bold text-white">
          전체 {myRanking ? `Top ${myRanking.totalRanking}` : "25"}위
        </Body2Text>
        <Body2Text className="font-bold text-white">
          {myRanking ? getTierByRating(myRanking.rating) : "Bronze"} Tier{" "}
          {myRanking ? `Top ${myRanking.tierRanking}` : "10"}위
        </Body2Text>
      </div>
    </div>
  );
};
