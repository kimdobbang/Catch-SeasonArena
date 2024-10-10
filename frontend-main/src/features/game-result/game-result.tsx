// src/pages/game-result-page.tsx
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { updateRatingByGameResult } from "@/app/redux/slice/userSlice";
import {
  fetchUserGameResult,
  UserGameResult,
} from "@/app/apis/game-result-api";
import { GameResultContainer } from "@/features/index";

export const GameResult = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const selectedAvatar = useSelector(
    (state: RootState) => state.user.selectedAvatar,
  );

  const [gameResult, setGameResult] = useState<UserGameResult | null>(null);
  const [winningOrLosing, setWinningOrLosing] = useState<string | null>(null);

  useEffect(() => {
    const loadGameResult = async () => {
      try {
        const fetchedGameResult = await fetchUserGameResult(accessToken);
        setGameResult(fetchedGameResult);

        console.log(fetchedGameResult);
        setWinningOrLosing(fetchedGameResult.rank === 1 ? "WIN" : "LOSE");
        dispatch(updateRatingByGameResult(fetchedGameResult.resultRating));
      } catch (error) {
        console.error("게임 결과를 가져오는데 실패했습니다:", error);
      }
    };

    if (accessToken) {
      loadGameResult();
    }
  }, [accessToken, dispatch]);

  if (!gameResult) {
    return <p>게임 결과를 불러오는 중입니다...</p>;
  }

  const emotion = winningOrLosing === "WIN" ? "normal" : "sad";
  const isWin = winningOrLosing === "WIN";

  return (
    <GameResultContainer
      isWin={isWin}
      ratingChange={gameResult.resultRating}
      kills={gameResult.kill}
      rank={gameResult.rank}
      time={gameResult.time}
      avatarNumber={selectedAvatar}
      emotion={emotion}
    />
  );
};
