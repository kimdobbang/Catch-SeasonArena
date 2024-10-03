// src/app/types/common.ts
// 여러 도메인이나 모듈에서 전역으로 사용되는 타입을 정의

export interface Collection {
  // 수정 필요
  itemId: number;
  name: string;
  description: string;
  image: string;
  quantity: number;
  grade: ItemGrade;
  season: Season;
  type: ItemType;
  createdAt: string | Date;
}

export interface Item {
  id: number;
  itemId: number;
  name: string;
  type: ItemType;
  grade: ItemGrade;
  skill: string;
  season: Season;
  description: string;
  image: string;
  durability: number;
}

export type ItemGrade = "normal" | "rare" | "legend";
export type Season = "spring" | "summer" | "autumn" | "winter";
export type ItemType = "weapon" | "active" | "passive";

// 아래는 수정 or 삭제 예정
export type InventoryItem = Pick<Item, "id" | "itemId" | "name" | "type">;

export const generateItemImagePath = (itemId: number): string => {
  return `/items/${itemId}.png`;
};

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
