//userSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nickName: "",
  userEmail: "",
  accessToken: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 모든 사용자 정보 저장
    setUser(state, action) {
      state.nickName = action.payload.name;
      state.userEmail = action.payload.email;
    },
    setNickName(state, action) {
      state.nickName = action.payload;
    },
    setUserEmail(state, action) {
      state.userEmail = action.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
  },
});

// acction
//dispatch로 액션을 전달해 상태를 어떻게 변화시킬지를 결정함
export const { setUser, setNickName, setUserEmail, setAccessToken } =
  userSlice.actions;

//reducer
export default userSlice.reducer;
