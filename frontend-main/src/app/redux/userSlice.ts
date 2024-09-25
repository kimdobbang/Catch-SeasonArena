// userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// UserState 타입 export
export interface UserState {
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  token: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
