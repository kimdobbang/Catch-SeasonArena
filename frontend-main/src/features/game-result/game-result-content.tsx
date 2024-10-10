import { ResultLayout } from "@ui/index";
import {
  AvatarFace,
  PrimaryButton,
  Body1Text,
  ProgressBar,
} from "@atoms/index";
import { formatTime } from "@/shared/utils/format";
import { GameResultStatBox } from "@/features/index";
import { useNavigate } from "react-router-dom";

interface GameResultProps {
  kills: number;
  rank: number;
  time: number;
  currentRating: number;
  resultRating: number;
  avatarNumber: number;
  emotion: "normal" | "sad";
  isWin: boolean;
}

export const GameResultContent = ({
  kills,
  rank,
  time,
  currentRating,
  resultRating,
  avatarNumber,
  emotion,
  isWin,
}: GameResultProps) => {
  const navigate = useNavigate();

  const handleCloseButton = () => {
    navigate("/main");
  };

  const resultTitle = isWin ? "Win!" : "Lose";
  const ratingDifference = resultRating - currentRating;
  const ratingText =
    ratingDifference > 0 ? `+ ${ratingDifference} P` : `${ratingDifference} P`;

  return (
    <ResultLayout
      title={resultTitle}
      isWin={isWin}
      contentComponent={
        <div className="flex flex-col items-center">
          <Body1Text className=" !text-catch-gray-300">{ratingText}</Body1Text>
          <ProgressBar className="mb-1" />
          <AvatarFace
            number={avatarNumber}
            emotion={emotion}
            width={250}
            height={250}
          />
          <div className="flex justify-between space-x-4">
            <GameResultStatBox value={formatTime(time)} caption="플레이 시간" />
            <GameResultStatBox value={`${rank}위`} caption="순위" />
            <GameResultStatBox value={`${kills}명`} caption="킬" />
          </div>
        </div>
      }
      buttonComponent={
        <PrimaryButton
          color="main"
          size="small"
          showIcon={false}
          onClick={handleCloseButton}
          className="mt-4"
        >
          닫기
        </PrimaryButton>
      }
    />
  );
};

export const GameResultContainer = (
  props: Omit<GameResultProps, "isWin"> & { isWin: boolean },
) => {
  return <GameResultContent {...props} />;
};
