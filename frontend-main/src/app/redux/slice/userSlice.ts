// src/app/redux/slice/userSlice.ts
// 유저 관리 상태: 도감, 장비, 아바타, 티어
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemType } from "@/app/types/common";
import { UserStat, UserEquipment, UserInfo } from "@/app/types/userType";
import { Tier, getTierByRating } from "@/app/types/tier";

export interface UserState extends UserInfo {
  rating: number;
  tier: Tier;
  selectedAvatar: number;
  stats: UserStat; // 유저 스탯 (체력, 공격력, 속도)
  equipment: UserEquipment<ItemType, number | null>; // 유저 장비 (무기, 패시브, 액티브)
}

// 초기 상태 설정(초기화)
// const initialState: UserState = {
//   email: "user@example.com",
//   nickName: "닉네임을 수정하세요",
//   rating: 500,
//   tier: getTierByRating(500),
//   selectedAvatar: 1,
//   stats: {
//     hp: 100,
//     coverage: 10,
//     speed: 10,
//   },
//   equipment: {
//     weapon: null,
//     active: null,
//     passive: null,
//   },
// };

// 초기 상태 설정 - mock 데이터로 설정
const initialState: UserState = {
  email: "mockuser@example.com",
  nickName: "김도이",
  rating: 1500,
  tier: getTierByRating(1500), // mock 티어 설정
  selectedAvatar: 2,
  stats: {
    hp: 100,
    coverage: 10,
    speed: 11,
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
    // 사용자가 선택한 아바타의 ID를 설정하는 리듀서
    setSelectedAvatar: (state, action: PayloadAction<number>) => {
      state.selectedAvatar = action.payload;
    },

    // 사용자 레이팅 설정
    // Redux DevTools를 통해 액션을 디스패치하고, setRating을 호출해 레이팅과 티어가 적절히 변경되는지 확인
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
});

export const { setSelectedAvatar, setRating, setEquipment } = userSlice.actions;

export default userSlice.reducer;
