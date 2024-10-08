// src/pages/game-result-page.tsx
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import {
  fetchUserGameResult,
  UserGameResult,
} from "@/app/apis/game-result-apis"; // UserGameResult 타입 가져오기

export const GameResultPage = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [gameResult, setGameResult] = useState<UserGameResult | null>(null); // UserGameResult 타입 사용

  useEffect(() => {
    const loadGameResult = async () => {
      try {
        const fetchedGameResult = await fetchUserGameResult(accessToken);
        setGameResult(fetchedGameResult); // 결과를 상태로 저장
      } catch (error) {
        console.error("게임 결과를 가져오는데 실패했습니다:", error);
      }
    };

    if (accessToken) {
      loadGameResult();
    }
  }, [accessToken]);

  return (
    <div>
      <h1>게임 결과</h1>
      {gameResult ? (
        <div>
          <p>킬 수: {gameResult.kill}</p>
          <p>플레이 수: {gameResult.play}</p>
          <p>순위: {gameResult.rank}</p>
          <p>현재 레이팅: {gameResult.rating}</p>
          <p>레이팅 증감량: {gameResult.resultRating}</p>
        </div>
      ) : (
        <p>게임 결과를 불러오는 중입니다...</p>
      )}
    </div>
  );
};
