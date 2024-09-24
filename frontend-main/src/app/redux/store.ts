//store.ts
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./useSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;
