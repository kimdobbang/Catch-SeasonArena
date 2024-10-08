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

export type UserEquipment = Record<
  ItemType,
  { inventoryId: number | null; itemId: number | null }
>;
