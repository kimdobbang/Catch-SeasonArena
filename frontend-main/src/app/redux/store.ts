//store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserState } from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = {
  user: UserState; // 명시적으로 UserState 타입 사용
};

export type AppDispatch = typeof store.dispatch;
