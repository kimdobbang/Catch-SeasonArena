// src/app/api/game-result-apis.ts
import config from "@/config";

export interface UserGameResult {
  kill: number;
  play: number;
  rank: number;
  rating: number; // 현재 레이팅
  resultRating: number; // 레이팅 증감량
}

// 게임 결과 조회 API
export const fetchUserGameResult = async (
  accessToken: string,
): Promise<UserGameResult> => {
  const response = await fetch(`${config.API_BASE_URL}/api/auth/endgame`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("게임 결과를 가져오는데 실패했습니다.");
  }

  const data = await response.json();
  return data as UserGameResult;
};
