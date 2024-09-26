// src/app/types/common.ts
// 전역적으로 사용되는 공통 타입

export interface UserInfo {
  email: string;
  nickName: string;
}

export interface UserStat {
  attackPower: number;
  defensePower: number;
  speed: number;
}

export interface UserEquipment<T, U> {
  weapon: T | U;
  active: T | U;
  passive: T | U;
}

export interface Collection {
  id: number;
  name: string;
  description: string;
  image: string;
  quantity: number;
  grade: ItemGrade;
  season: Season;
  type: ItemType;
}

export interface Item {
  id: number;
  name: string;
  type: ItemType;
  grade: ItemGrade;
  skill: string;
  season: Season;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  durability: number;
}

// 타입 정의(대문자로 수정)
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