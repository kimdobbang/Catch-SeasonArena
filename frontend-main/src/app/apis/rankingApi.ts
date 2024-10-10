import axios from "axios";
import config from "@/config";

export interface RankingProps {
  tier: string;
  nickname: string;
  avatar: number; // 숫자로 저장
  tierRanking: number;
  rating: number;
}

export interface MyRankingProps {
  tier: string;
  nickname: string;
  totalRanking: number;
  tierRanking: number;
  rating: number;
}

export const fetchTierRankings = async (page: number, accessToken: string) => {
  try {
    const response = await axios.get(
      `${config.API_BASE_URL}/api/auth/rankings/tier/${page}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (response.data.tierRanks.length > 0) {
      // avatar를 string에서 number로 변환
      const rankings = response.data.tierRanks.map((rank: any) => ({
        ...rank,
        avatar: parseInt(rank.avatar, 10), // avatar를 숫자로 변환하여 저장
      }));

      return rankings;
    } else return response.data.tierRanks;
  } catch (error) {
    console.error("Error fetching rankings:", error);
    return [];
  }
};

export const fetchTotalRankings = async (page: number, accessToken: string) => {
  try {
    const response = await axios.get(
      `${config.API_BASE_URL}/api/auth/rankings/all/${page}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (response.data.tierRanks.length > 0) {
      // avatar를 string에서 number로 변환
      const rankings = response.data.tierRanks.map((rank: any) => ({
        ...rank,
        avatar: parseInt(rank.avatar, 10), // avatar를 숫자로 변환하여 저장
      }));

      return rankings;
    } else return response.data.tierRanks;
  } catch (error) {
    console.error("Error fetching total rankings:", error);
    return [];
  }
};

export const fetchMyRanking = async (accessToken: string) => {
  try {
    const response = await axios.get(
      `${config.API_BASE_URL}/api/auth/rankings/tier/0`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data.myRank;
  } catch (error) {
    console.error("Error fetching MY ranking", error);
    return {};
  }
};
