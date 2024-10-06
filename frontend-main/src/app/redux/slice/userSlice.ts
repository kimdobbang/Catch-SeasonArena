// src/app/redux/slice/userSlice.ts
// 유저 관리 상태: 도감, 장비, 아바타, 티어, 닉네임(authSlice참조함)
// src/app/redux/slice/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserEquipment, UserStat, UserInfo } from "@/app/types/userType";
import { Tier, getTierByRating } from "@/app/types/tier";
import { setAuthUser, updateAuthNickname } from "./authSlice";
import { AppThunk } from "@/app/redux/store";

export interface UserState extends UserInfo {
  rating: number;
  tier: Tier;
  selectedAvatar: number;
  stats: UserStat;
  equipment: UserEquipment;
}

const initialState: UserState = {
  email: "user@example.com",
  nickname: "닉네임을 수정하세요",
  rating: 1,
  tier: getTierByRating(1),
  selectedAvatar: 2,
  stats: {
    hp: 100,
    coverage: 10,
    speed: 10,
  },
  equipment: {
    weapon: 1,
    active: null,
    passive: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
    updateUserEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setSelectedAvatar: (state, action: PayloadAction<number>) => {
      state.selectedAvatar = action.payload;
    },
    setRating: (state, action: PayloadAction<number>) => {
      state.rating = action.payload;
      state.tier = getTierByRating(action.payload) as Tier;
    },
    updateRatingByGameResult: (state, action: PayloadAction<number>) => {
      state.rating += action.payload;
      state.tier = getTierByRating(state.rating);
    },

    // 개별 장비 업데이트 액션 추가
    setWeapon: (state, action: PayloadAction<number | null>) => {
      state.equipment.weapon = action.payload;
    },
    setActive: (state, action: PayloadAction<number | null>) => {
      state.equipment.active = action.payload;
    },
    setPassive: (state, action: PayloadAction<number | null>) => {
      state.equipment.passive = action.payload;
    },
    // 유저 스탯 추가
    setHp: (state, action: PayloadAction<number>) => {
      state.stats.hp = action.payload;
    },
    setCoverage: (state, action: PayloadAction<number>) => {
      state.stats.coverage = action.payload;
    },
    setSpeed: (state, action: PayloadAction<number>) => {
      state.stats.speed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setAuthUser, (state, action) => {
      console.log(
        "authSlice's setUser dispatched in userSlice",
        action.payload,
      );
      state.nickname = action.payload.nickname;
      state.email = action.payload.email;
    });
  },
});

// 유저 닉네임을 변경할 때 authSlice의 닉네임도 업데이트
export const updateUserAndAuthNickname =
  (nickname: string): AppThunk =>
  (dispatch) => {
    dispatch(updateAuthNickname(nickname)); // authSlice 업데이트
    dispatch(updateUserNickname(nickname)); // userSlice 업데이트
  };

export const {
  setSelectedAvatar,
  setRating,
  setWeapon,
  setActive,
  setPassive,
  updateUserNickname,
} = userSlice.actions;

export default userSlice.reducer;
