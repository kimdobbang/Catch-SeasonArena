import { CircleAvatar } from "@/shared/components/entities";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { RankingListContainer } from "./ranking-list-container";

import { Background } from "@/shared/ui";
export const Ranking = () => {
  const userAvatar = useSelector(
    (state: RootState) => state.user.selectedAvatar,
  );

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center justify-center w-full h-[20%]">
        <CircleAvatar
          avatarIcon={false}
          number={userAvatar}
          height={96}
          emotion="normal"
        />
      </div>
      <Background className="flex  flex-col h-[80%] w-full justify-center items-center">
        <RankingListContainer className="h-[80%]" />
      </Background>
    </div>
  );
};
