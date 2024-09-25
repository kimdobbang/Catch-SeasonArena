// src/app/types/common.ts

// 타입 정의
export type ItemGrade = "normal" | "rare" | "legend";
export type Season = "spring" | "summer" | "autumn" | "winter";
export type ItemType = "weapon" | "active" | "passive";

// 타입별 한국어 이름 매핑
export const seasonNames: Record<Season, string> = {
  spring: "봄",
  summer: "여름",
  autumn: "가을",
  winter: "겨울",
};

export const itemTypeNames: Record<ItemType, string> = {
  weapon: "무기",
  active: "액티브",
  passive: "패시브",
};

export const itemGradeNames: Record<ItemGrade, string> = {
  normal: "일반",
  rare: "레어",
  legend: "레전드",
};
