// src/app/redux/slice/authSlice.ts
// 인증 관련 상태: 로그인, 로그아웃, 인증 토큰 및 인증상태,  & 이메일, 닉네임 -> userSlice에서 참조하러옴
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo, initialUserInfo } from "@/app/types/userType";

export interface AuthState {
  accessToken: string;
  userInfo: UserInfo;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  accessToken: "",
  userInfo: initialUserInfo,
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
    setAuthUser: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    updateAuthNickname: (state, action: PayloadAction<string>) => {
      if (state.userInfo) {
        state.userInfo.nickname = action.payload;
      }
    },
    clearAuthState: (state) => {
      state.accessToken = "";
      state.userInfo = initialUserInfo;
      state.isAuthenticated = false;
    },
  },
});

export const { setToken, setAuthUser, updateAuthNickname, clearAuthState } =
  authSlice.actions;
export default authSlice.reducer;
