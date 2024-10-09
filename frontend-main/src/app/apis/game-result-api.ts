// src/app/api/game-result-apis.ts
import config from "@/config";

export interface UserGameResult {
  kill: number;
  time: number;
  rank: number;
  rating: number; // 현재 레이팅(게임 전)
  resultRating: number; // 레이팅 증감량
}

// 게임 결과 조회 API
// Mock 데이터를 사용하는 동안, 인자를 받지 않도록 수정
// export const fetchUserGameResult = async ()
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

  const { data } = await response.json();
  return data as UserGameResult;

  // // Mock 데이터 반환
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({
  //       kill: 5, // 킬 수
  //       time: 113, // 게임 시간 (초)
  //       // rank: 1, // 게임 순위 (1등)
  //       rank: 2, // 게임 순위 (2등)
  //       rating: 1500, // 현재 레이팅
  //       resultRating: -50, // 레이팅 증감량
  //     });
  //   }, 1000); // 1초 후에 Mock 데이터 반환
  // });
};
