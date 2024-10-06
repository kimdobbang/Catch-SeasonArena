// src/ap/types/userType.ts
import { ItemType } from "./common";

export interface UserInfo {
  email: string;
  nickname: string;
}

export const initialUserInfo: UserInfo = {
  email: "",
  nickname: "",
};

export interface UserStat {
  hp: number;
  coverage: number;
  speed: number;
}

export type UserEquipment = Record<ItemType, number | null>; // key는 ItemType (weapon, active, passive)이고 value는 itemId (number | null)
