// src/app/redux/slice/userSlice.ts
// 유저 관리 상태: 도감, 장비, 아바타, 티어
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemType, Collection } from "@/app/types/common";
import { UserStat, UserEquipment, UserInfo } from "@/app/types/userType";
import { Tier, getTierByRating } from "@/app/types/tier";

export interface UserState extends UserInfo {
  rating: number;
  tier: Tier;
  collections: Collection[]; // 유저 도감
  selectedAvatar: number;
  stats: UserStat; // 유저 스탯 (체력, 공격력, 속도)
  equipment: UserEquipment<string, string | null>; // 유저 장비 (무기, 패시브, 액티브)
}

// // 초기 상태 설정(초기화)
// const initialState: UserState = {
//   email: "user@example.com",
//   nickName: "닉네임을 수정하세요",
//   rating: 500,
//   tier: getTierByRating(500),
//   collections: [],
//   selectedAvatar: 1,
//   stats: {
//     hp: 100,
//     attackPower: 10,
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
  collections: [
    {
      id: 1,
      name: "코스모완드",
      description: "뒤로 넉백 +30%",
      image: "/images/sword.png",
      quantity: 1,
      grade: "rare",
      season: "autumn",
      type: "weapon",
      createdAt: "2022-01-01T00:00:00.000Z", // ISO 문자열로 변경
    },
    {
      id: 2,
      name: "뚜기점프",
      description: "대시 공격",
      image: "/images/sword.png",
      quantity: 1,
      grade: "rare",
      season: "autumn",
      type: "active",
      createdAt: "2022-01-01T00:00:00.000Z", // ISO 문자열로 변경
    },
    {
      id: 3,
      name: "다라미",
      description: "뒤로 넉백 +30%",
      image: "/images/sword.png",
      quantity: 1,
      grade: "legend",
      season: "autumn",
      type: "passive",
      createdAt: "2022-01-01T00:00:00.000Z", // ISO 문자열로 변경
    },
  ],
  selectedAvatar: 2,
  stats: {
    hp: 100,
    attackPower: 10,
    speed: 11,
  },
  equipment: {
    weapon: "코스모완드",
    active: "뚜기점프",
    passive: "다라미",
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

    // 사용자가 착용 중인 장비(무기, 활성 아이템, 패시브 아이템)를 설정
    setEquipment: (
      state,
      action: PayloadAction<UserEquipment<ItemType, string | null>>,
    ) => {
      state.equipment = action.payload;
    },

    // 컬렉션 아이템 추가
    addCollectionItem(state, action: PayloadAction<Collection>) {
      state.collections.push(action.payload);
    },

    // 기존 전체 컬렉션 재설정(필요 없을 듯?)
    setCollections: (state, action: PayloadAction<Collection[]>) => {
      state.collections = action.payload;
    },

    // 컬렉션 ID로 해당 아이템을 찾아 보유 수량을 업데이트
    updateCollectionQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) {
      const collection = state.collections.find(
        (item) => item.id === action.payload.id,
      );
      if (collection) {
        collection.quantity = action.payload.quantity;
      }
    },
  },
});

export const {
  addCollectionItem,
  updateCollectionQuantity,
  setSelectedAvatar,
  setRating,
  setEquipment,
  setCollections,
} = userSlice.actions;

export default userSlice.reducer;
