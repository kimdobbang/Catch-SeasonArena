// src/app/types/common.ts

// 타입 정의(대문자로 수정)
export type ItemGrades = "normal" | "rare" | "legend";
export type Seasons = "spring" | "summer" | "autumn" | "winter";
export type ItemTypes = "weapon" | "active" | "passive";

// 타입별 한국어 이름 매핑
export const seasonNames: Record<Seasons, string> = {
  spring: "봄",
  summer: "여름",
  autumn: "가을",
  winter: "겨울",
};

export const itemTypeNames: Record<ItemTypes, string> = {
  weapon: "무기",
  active: "액티브",
  passive: "패시브",
};

export const itemGradeNames: Record<ItemGrades, string> = {
  normal: "일반",
  rare: "레어",
  legend: "레전드",
};
