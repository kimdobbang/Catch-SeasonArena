import { useNavigate } from "react-router-dom";
import {
  Body1Text,
  PrimaryButton,
  SquareIconButton,
} from "@/shared/components/atoms";
import {
  TierProgressBar,
  UserNameContainer,
} from "@/shared/components/entities";
import { CircleAvatar } from "@/shared/components/entities/user/circle-avatar";
import Ranking from "@/assets/icons/ranking.svg?react";
import CollectionBook from "@/assets/icons/collectionbook.svg?react";
import CardGame from "@/assets/icons/card-game.svg?react";
import { NavBarBackground } from "@/shared/ui";

export const Main = () => {
  const navigate = useNavigate();
  const goToGamePage = () => {
    navigate("/game"); // 예를 들어 react-router-dom의 navigate 사용
  };

  const goToRankingPage = () => {
    navigate("/ranking"); // 예를 들어 react-router-dom의 navigate 사용
  };

  const goToCollectionBookPage = () => {
    navigate("/collectionbook"); // 예를 들어 react-router-dom의 navigate 사용
  };

  const goToCombinationPage = () => {
    navigate("/combination"); // 예를 들어 react-router-dom의 navigate 사용
  };

  // main 페이지에서 토큰 확인 및 로그인 상태 체크 예시
  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //   if (!token) {
  //     navigate("/login"); // 토큰이 없으면 로그인 페이지로 리디렉션
  //   }
  // }, [navigate]);
  return (
    <div className="w-full h-full ">
      <div
        className="w-full h-[30%] flex flex-col items-center justify-center"
        style={{
          background:
            "linear-gradient(1deg, #FEF8EC -2.21%, rgba(254, 251, 245, 0.53) 51.4%, rgba(255, 255, 255, 0) 99.05%)",
        }}
      >
        <CircleAvatar
          avatarIcon={true}
          number={1}
          emotion="sad"
          width={300}
          height={300}
        />
        <Body1Text className="text-left text-catch-main-400">
          2024 Autumn
        </Body1Text>
      </div>
      <div className="w-full h-[70%] flex flex-col items-center gap-6">
        <UserNameContainer className="mt-4" nickname="김도이" rating={2100} />
        <TierProgressBar rating={2100} />
        <PrimaryButton
          onClick={goToGamePage}
          size="small"
          showIcon={true}
          color="main"
        >
          시즌아레나
        </PrimaryButton>
        <div className="flex flex-row w-full justify-evenly">
          <SquareIconButton
            onClick={goToRankingPage}
            icon={<Ranking />}
            label="시즌랭킹"
          />
          <SquareIconButton
            onClick={goToCollectionBookPage}
            icon={<CollectionBook />}
            label="도감"
          />
          <SquareIconButton
            onClick={goToCombinationPage}
            icon={<CardGame />}
            label="합성"
          />
        </div>
      </div>
      <NavBarBackground className="mt-3" />
    </div>
  );
};
