import { Caption1Text } from "@/shared/components/atoms";
import { MyRankingBox } from "./my-ranking-box";
import { UserRankingBox } from "./user-ranking-box";

export const TierRankingTab = () => {
  return (
    <div className="flex flex-col w-full h-full ">
      <Caption1Text>티어 순위 컴포넌트</Caption1Text>
      <div className="flex flex-col items-center h-[25%] ">
        <MyRankingBox />
      </div>
      <hr className="mt-3 mb-3 " />
      <div className="flex flex-col items-center gap-5 justify-evenly h-[75%]">
        <UserRankingBox avatar={1} nickname="Jack" rating={300} rank={120} />
        <UserRankingBox avatar={1} nickname="Jack" rating={300} rank={120} />
        <UserRankingBox avatar={1} nickname="Jack" rating={300} rank={120} />
        <UserRankingBox avatar={1} nickname="Jack" rating={300} rank={120} />
      </div>
    </div>
  );
};
