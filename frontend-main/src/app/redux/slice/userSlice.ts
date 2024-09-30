// src/app/redux/slice/userSlice.ts
// 유저 관리 상태: 도감, 장비, 아바타, 티어, 닉네임(authSlice참조함)
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemType } from "@/app/types/common";
import { UserEquipment, UserStat, UserInfo } from "@/app/types/userType";
import { Tier, getTierByRating } from "@/app/types/tier";
import { setUser } from "./authSlice";

export interface UserState extends UserInfo {
  rating: number;
  tier: Tier;
  selectedAvatar: number;
  stats: UserStat; // 유저 스탯 (체력, 공격력, 속도)
  equipment: UserEquipment<ItemType, number | null>; // 유저 장비 (무기, 패시브, 액티브)
}
const initialState: UserState = {
  email: "user@example.com",
  nickName: "닉네임을 수정하세요",
  rating: 500,
  tier: getTierByRating(500),
  selectedAvatar: 2,
  stats: {
    hp: 100,
    coverage: 10,
    speed: 10,
  },
  equipment: {
    weapon: 1,
    active: 2,
    passive: 3,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedAvatar: (state, action: PayloadAction<number>) => {
      state.selectedAvatar = action.payload;
    },

    // 게임 결과에 따라 반환 받은 값을 현재 raiting에 + 해주도록 수정 필요
    setRating: (state, action: PayloadAction<number>) => {
      state.rating = action.payload;
      state.tier = getTierByRating(action.payload);
    },
    // 사용자가 착용 중인 장비(무기, 액티브, 패시브 아이템)를 설정 -> 각각 나눠야할듯?
    setEquipment: (
      state,
      action: PayloadAction<UserEquipment<ItemType, number | null>>,
    ) => {
      state.equipment = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setUser, (state, action) => {
      state.nickName = action.payload.nickName;
      state.email = action.payload.email;
    });
  },
});

export const { setSelectedAvatar, setRating, setEquipment } = userSlice.actions;

export default userSlice.reducer;
