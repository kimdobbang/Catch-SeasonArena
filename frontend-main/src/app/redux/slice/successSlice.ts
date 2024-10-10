/* 수집, 합성 성공시 결과를 저장
-> entities/item/success-content 와 ui/collect-card 에서 사용합니다 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProcessedResult } from "@/app/apis/collect-api";

export interface CollectSuccess {
  name: string;
  itemId: number;
  type: string;
  grade: string;
  effect: string;
}

// ProcessedResult 타입에 수집 시간 추가
export interface CollectSuccessWithTime extends CollectSuccess {
  createdTime: number;
}

// 초기 상태 정의
const initialState: CollectSuccessWithTime = {
  name: "",
  itemId: 0,
  type: "",
  grade: "",
  effect: "",
  createdTime: 0,
};

// Redux Slice 생성
export const successSlice = createSlice({
  name: "success",
  initialState,
  reducers: {
    // Success 데이터를 받아서 state에 저장하는 리듀서
    setSuccess: (state, action: PayloadAction<ProcessedResult>) => {
      state.name = action.payload.name;
      state.itemId = action.payload.itemId;
      state.type = action.payload.type;
      state.grade = action.payload.grade;
      state.effect = action.payload.effect;
      state.createdTime = Date.now();
    },
    // Success 데이터를 초기화하는 리듀서 (삭제하는 액션)
    clearSuccess: (state) => {
      state.name = "";
      state.itemId = 0;
      state.type = "";
      state.grade = "";
      state.effect = "";
      state.createdTime = 0;
    },
  },
});

// 액션과 리듀서 export
export const { setSuccess, clearSuccess } = successSlice.actions;
export default successSlice.reducer;
