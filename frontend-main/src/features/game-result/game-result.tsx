// src/pages/game-result-page.tsx
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { updateRatingByGameResult } from "@/app/redux/slice/userSlice";
import {
  fetchUserGameResult,
  UserGameResult,
} from "@/app/apis/game-result-api";

export const GameResult = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  // const updatedRating = useSelector((state: RootState) => state.user.rating); // 현재? 합산된? 레이팅 가져오기
  const [gameResult, setGameResult] = useState<UserGameResult | null>(null);
  const [winningOrLosing, setWinningOrLosing] = useState<string | null>(null);

  useEffect(() => {
    const loadGameResult = async () => {
      try {
        const fetchedGameResult = await fetchUserGameResult(accessToken);
        setGameResult(fetchedGameResult);
        console.log(fetchedGameResult);
        if (fetchedGameResult.rank === 1) {
          setWinningOrLosing("WIN");
        } else {
          setWinningOrLosing("LOSE");
        }
        dispatch(updateRatingByGameResult(fetchedGameResult.resultRating));
      } catch (error) {
        console.error("게임 결과를 가져오는데 실패했습니다:", error);
      }
    };

    if (accessToken) {
      loadGameResult();
    }
  }, []);

  return (
    <div>
      <h1>게임 결과 test 페이지</h1>
      {gameResult ? (
        <div>
          <p>결과: {winningOrLosing}</p>
          <p>킬 수: {gameResult.kill}</p>
          <p>플레이 수: {gameResult.time}</p>
          <p>순위: {gameResult.rank}</p>
          <p>이전 레이팅: {gameResult.rating}</p>
          <p>레이팅 증감량: {gameResult.resultRating}</p>

          {/* 리덕스에 넣을 값을 백에서 뭘 주는지를 아직 모름,,, */}
          {/* <p>(참고)최종 레이팅: {updatedRating} </p> */}
        </div>
      ) : (
        <p>게임 결과를 불러오는 중입니다...</p>
      )}
    </div>
  );
};
