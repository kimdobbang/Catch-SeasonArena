//store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";
import authReducer from "./slice/authSlice";
import userReducer from "./slice/userSlice";

// redux-persist 설정
const persistConfig = {
  key: "root", // persist key 설정
  storage: sessionStorage, // sessionStorage 사용
  whitelist: ["auth", "user"], // 저장할 slice 이름 지정
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

// persistReducer로 감싸기
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 스토어 설정
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: [
          "user.collections.createdAt",
          "user.collections.updatedAt",
        ], // 직렬화 검사에서 제외
      },
    }),
});

// redux-persist를 사용한 persistor 설정
export const persistor = persistStore(store);

// RootState 타입 정의
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch 타입 정의
export type AppDispatch = typeof store.dispatch;
