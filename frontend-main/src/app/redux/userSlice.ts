// userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// UserState 타입 export
export interface UserState {
  accessToken: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  accessToken: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
