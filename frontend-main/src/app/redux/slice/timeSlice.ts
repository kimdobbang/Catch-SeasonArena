import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TimeProp {
  collectTime: number;
}

// 초기 상태 정의
const initialState: TimeProp = {
  collectTime: 0,
};

// Redux Slice 생성
export const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    setTimeSlice: (state, action: PayloadAction<number>) => {
      state.collectTime = action.payload;
    },
    clearTimeSlice: (state) => {
      state.collectTime = 0;
    },
  },
});

// 액션과 리듀서 export
export const { setTimeSlice, clearTimeSlice } = timeSlice.actions;
export default timeSlice.reducer;
