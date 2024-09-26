// src/app/redux/slice/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemType, Collection } from "@/app/types/common";
import { UserStat, UserEquipment, UserInfo } from "@/app/types/userType";

export interface UserState extends UserInfo {
  rating: number; // 레이팅
  collections: Collection[]; // 유저 도감
  selectedAvatar: number;
  stats: UserStat; // 유저 스탯 (공격력, 방어력, 속도)
  equipment: UserEquipment<string, string | null>; // 유저 장비 (무기, 패시브, 액티브)
}

// 초기 상태 설정(초기화)
const initialState: UserState = {
  email: "user@example.com",
  nickName: "닉네임을 수정하세요",
  rating: 500,
  collections: [],
  selectedAvatar: 1,
  stats: {
    attackPower: 100,
    defensePower: 10,
    speed: 10,
  },
  equipment: {
    weapon: null,
    active: null,
    passive: null,
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
    setRating: (state, action: PayloadAction<number>) => {
      state.rating = action.payload;
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

    // ...다른 리듀서들
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
