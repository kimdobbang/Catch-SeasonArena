// src/ap/types/userType.ts

export interface UserInfo {
  email: string;
  nickName: string;
}

export const initialUserInfo: UserInfo = {
  email: "",
  nickName: "",
};

export interface UserStat {
  hp: number;
  coverage: number;
  speed: number;
}

export interface UserEquipment<T, U> {
  weapon: T | U | null;
  active: T | U | null;
  passive: T | U | null;
}
