// src/ap/types/userType.ts
import { Collection } from "@/app/types/common";

// 사용자 관련 타입 정의
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
  weapon: T | U | null;
  active: T | U | null;
  passive: T | U | null;
}

export interface UserState extends UserInfo {
  rating: number;
  collections: Collection[];
  selectedAvatar: number;
  stats: UserStat;
  equipment: UserEquipment<string, string | null>;
}
