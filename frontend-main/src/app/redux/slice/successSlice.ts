import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProcessedResult } from "@/app/apis/collectApi";

// 초기 상태 정의
const initialState: ProcessedResult = {
  name: "메이플 창",
  itemId: 1,
  type: "WEAPON",
  grade: "NORMAL",
  effect: "사거리 +30%",
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
    },
  },
});

// 액션과 리듀서 export
export const { setSuccess } = successSlice.actions;
export default successSlice.reducer;
