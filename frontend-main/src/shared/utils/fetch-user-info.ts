// src/app/utils/authUtils.ts
import { setToken, setUser } from "@/app/redux/slice/authSlice";
import { setEquipment, setRating } from "@/app/redux/slice/userSlice";
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
    console.log("유저정보 조회성공", data);

    dispatch(setUser({ email: data.email, nickname: data.nickname }));
    dispatch(setEquipment(data.equipment));
    dispatch(setRating(data.rating));

    navigate("/main");
  } catch (error) {
    console.error("로그인 후 사용자 정보 불러오기 실패:", error);
  }
};
