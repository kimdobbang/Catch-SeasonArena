// src/app/utils/authUtils.ts
import { setToken, setAuthUser } from "@/app/redux/slice/authSlice";
import {
  setWeapon,
  setPassive,
  setActive,
  setRating,
} from "@/app/redux/slice/userSlice";
import { fetchUserInfo } from "@/app/apis/authApi";
import { UserState } from "@/app/redux/slice/userSlice";
import { AppDispatch } from "@/app/redux/store";

export const handleLoginSuccess = async (
  accessToken: string,
  dispatch: AppDispatch,
  navigate: (path: string) => void,
) => {
  try {
    dispatch(setToken(accessToken));

    const data: UserState = await fetchUserInfo(accessToken);

    dispatch(setAuthUser({ email: data.email, nickname: data.nickname }));
    dispatch(setRating(data.rating));
    dispatch(setWeapon(data.equipment.weapon));
    dispatch(setPassive(data.equipment.passive));
    dispatch(setActive(data.equipment.active));

    navigate("/main");
  } catch (error) {
    console.error("로그인 후 사용자 정보 불러오기 실패:", error);
  }
};
