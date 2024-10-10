//store.ts
import {
  configureStore,
  combineReducers,
  ThunkAction,
  Action,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";
import authReducer from "./slice/authSlice";
import userReducer from "./slice/userSlice";
import timeReducer from "./slice/timeSlice";
import successReducer from "./slice/successSlice";

const persistConfig = {
  key: "root",
  storage: sessionStorage,
  whitelist: ["auth", "user", "success", "time"],
};

const rootReducer = combineReducers({
  auth: authReducer, // 인증정보
  user: userReducer, // 사용자정보
  success: successReducer, // 수집,합성 성공한 아이템 저장
  time: timeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: [
          "user.collections.createdAt",
          "user.collections.updatedAt",
        ],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
export type AppDispatch = ThunkDispatch<RootState, unknown, Action<string>>; // ThunkDispatch를 사용하여 AppDispatch가 Thunk를 처리할 수 있게 설정

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const persistor = persistStore(store);
