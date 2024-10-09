// src/app/types/Tier.ts

// Tier 타입 정의
export type Tier =
  | "Bronze"
  | "Silver"
  | "Gold"
  | "Platinum"
  | "Diamond"
  | "Ruby";

// 각 티어에 대응하는 점수 범위
export const tierRanges: Record<Tier, { min: number; max: number }> = {
  Bronze: { min: 0, max: 500 },
  Silver: { min: 501, max: 1000 },
  Gold: { min: 1001, max: 1500 },
  Platinum: { min: 1501, max: 2000 },
  Diamond: { min: 2001, max: 2500 },
  Ruby: { min: 2501, max: 3000 },
};

// 주어진 점수에 따른 티어를 반환하는 함수
export function getTierByRating(rating: number): Tier {
  if (rating >= 0 && rating <= 500) return "Bronze";
  if (rating >= 501 && rating <= 1000) return "Silver";
  if (rating >= 1001 && rating <= 1500) return "Gold";
  if (rating >= 1501 && rating <= 2000) return "Platinum";
  if (rating >= 2001 && rating <= 2500) return "Diamond";
  if (rating >= 2501 && rating <= 3000) return "Ruby";
  throw new Error("Invalid rating");
}
