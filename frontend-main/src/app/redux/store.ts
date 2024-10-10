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
import successReducer, { clearSuccess } from "./slice/successSlice";

const persistConfig = {
  key: "root",
  storage: sessionStorage,
  whitelist: ["auth", "user", "success"],
};

const rootReducer = combineReducers({
  auth: authReducer, // 인증정보
  user: userReducer, // 사용자정보
  success: successReducer, // 수집,합성 성공한 아이템 저장
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

persistor.subscribe(() => {
  const state = store.getState();
  const now = Date.now();
  const oneMinute = 60 * 1000;

  // createdTime이 있고, 1분 이상 지났으면 상태를 clear
  if (
    state.success.createdTime != 0 &&
    now - state.success.createdTime > oneMinute
  ) {
    console.log("Success state expired, clearing it...");
    store.dispatch(clearSuccess());
  }
});
