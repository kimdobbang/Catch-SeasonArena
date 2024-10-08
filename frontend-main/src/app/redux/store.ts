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
  // 유효기간 체크 로직
  transforms: [
    {
      in: (inboundState, key) => {
        if (key === "success") {
          const successState = inboundState;
          const now = Date.now();
          const oneMinute = 60 * 1000;

          // 데이터가 1분 이상된 경우 null로 리셋
          if (
            successState?.createdTime &&
            now - successState.createdTime > oneMinute
          ) {
            return null; // success 상태 리셋
          }
        }

        // 다른 상태는 그대로 반환
        return inboundState;
      },
      out: (outboundState, key) => outboundState, // 복원된 데이터를 그대로 리턴
    },
  ],
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

// 매번 상태 복원시 시간이 지났다면 success 상태를 clear
persistor.subscribe(() => {
  const state = store.getState();
  console.log("Current success state:", state.success);

  const now = Date.now();
  const oneMinute = 60 * 1000;

  if (
    state.success.createdTime &&
    now - state.success.createdTime > oneMinute
  ) {
    store.dispatch(clearSuccess());
  }
});
