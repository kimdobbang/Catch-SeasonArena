// src/ap/types/userType.ts
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
