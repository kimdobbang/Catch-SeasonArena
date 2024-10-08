import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import {
  Body1Text,
  PrimaryButton,
  SquareIconButton,
} from "@/shared/components/atoms";
import {
  TierProgressBar,
  UserNameContainer,
  CircleAvatar,
} from "@/shared/components/entities";
import Ranking from "@/assets/icons/ranking.svg?react";
import CollectionBook from "@/assets/icons/collectionbook.svg?react";
import CardGame from "@/assets/icons/card-game.svg?react";
import { NavBarBackground } from "@/shared/ui";

export const Main = () => {
  const navigate = useNavigate();

  const goToMatchingPage = () => {
    navigate("/matching");
  };

  const goToRankingPage = () => {
    navigate("/ranking");
  };

  const goToCollectionBookPage = () => {
    navigate("/collectionbook");
  };

  const goToCombinationPage = () => {
    navigate("/combination");
  };

  const goToAvatarChange = () => {
    navigate("/avatar");
  };
  const userAvatar = useSelector(
    (state: RootState) => state.user.selectedAvatar,
  );

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
          number={userAvatar}
          emotion="normal"
          width={96}
          onClick={goToAvatarChange}
        />
        <div className="w-full px-4">
          <Body1Text className="!text-left text-catch-main-400 ">
            2024 Autumn
          </Body1Text>
        </div>
      </div>
      <div className="w-full h-[70%] flex flex-col items-center gap-6">
        <UserNameContainer className="mt-4" />
        <TierProgressBar />
        <PrimaryButton
          onClick={goToMatchingPage}
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
