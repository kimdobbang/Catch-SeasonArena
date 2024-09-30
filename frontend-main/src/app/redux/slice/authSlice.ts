// src/app/redux/slice/authSlice.ts
// 인증 관련 상태: 로그인, 로그아웃, 인증 토큰 및 인증상태,  & 이메일, 닉네임 -> userSlice에서 참조하러옴
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "@/app/types/userType";

export interface AuthState {
  accessToken: string | null;
  userInfo: UserInfo | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  userInfo: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    setNickName: (state, action: PayloadAction<string>) => {
      if (state.userInfo) {
        state.userInfo.nickName = action.payload;
      }
    },
    deleteToken: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
    },
    deleteUser: (state) => {
      state.userInfo = null;
    },
    logout: (state) => {
      state.accessToken = null;
      state.userInfo = null;
      state.isAuthenticated = false;
    },
  },
});

export const {
  setToken,
  setUser,
  setNickName,
  deleteToken,
  deleteUser,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
