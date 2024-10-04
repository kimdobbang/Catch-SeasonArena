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
  stats: UserStat;
  equipment: UserEquipment<ItemType, number | null>;
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
    setSelectedAvatar: (state, action: PayloadAction<number>) => {
      state.selectedAvatar = action.payload;
    },

    setRating: (state, action: PayloadAction<number>) => {
      state.rating = action.payload;
      state.tier = getTierByRating(action.payload);
    },

    updateRatingByGameResult: (state, action: PayloadAction<number>) => {
      state.rating += action.payload; // 전달된 값만큼 레이팅을 업데이트
      state.tier = getTierByRating(state.rating);
    },

    // 사용자가 착용 중인 장비(무기, 액티브, 패시브 아이템)를 설정 -> 인벤토리를 나갈 때 한꺼번에 설정하자
    setEquipment: (
      state,
      action: PayloadAction<UserEquipment<ItemType, number | null>>,
    ) => {
      state.equipment = action.payload;
    },

    // 장비랑 stats 어케해야할지 모르겠엄 하나하나씩 (3가지 * 2개) 6개 액션 만드는건 아닌거같고.
    // 4페이지 나갈때? 닫을때 저장되어야하나... 해보며 수정하자

    // HP 수정
    setHp: (state, action: PayloadAction<number>) => {
      state.stats.hp = action.payload;
    },

    // Coverage 수정
    setCoverage: (state, action: PayloadAction<number>) => {
      state.stats.coverage = action.payload;
    },

    // Speed 수정
    setSpeed: (state, action: PayloadAction<number>) => {
      state.stats.speed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setUser, (state, action) => {
      console.log(
        "authSlice's setUser dispatched in userSlice",
        action.payload,
      );
      state.nickname = action.payload.nickname;
      state.email = action.payload.email;
    });
  },
});

export const { setSelectedAvatar, setRating, setEquipment } = userSlice.actions;

export default userSlice.reducer;
