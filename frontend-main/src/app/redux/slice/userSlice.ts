// src/app/redux/slice/userSlice.ts
import { ItemType, Collection } from "@/app/types/common";
import { UserEquipment } from "@/app/types/userType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  collections: Collection[];
  selectedAvatar: number | null; // 기본 아바타 설정 필요
  rating: number | null; // 시작 레이팅 설정 필요
  equipment: UserEquipment<ItemType, string>;
}

// 초기 상태 설정
const initialState: UserState = {
  collections: [],
  selectedAvatar: 0, // 기본 아바타 ID 설정
  rating: 500, // 시작 레이팅 설정
  equipment: {
    weapon: "",
    active: "",
    passive: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 사용자 아바타 선택 설정
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
      action: PayloadAction<UserEquipment<ItemType, string>>,
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

// 각 리듀서의 액션을 추출하여 내보냅니다.
export const {
  addCollectionItem,
  updateCollectionQuantity,
  setSelectedAvatar,
  setRating,
  setEquipment,
  setCollections,
} = userSlice.actions;

export default userSlice.reducer;
