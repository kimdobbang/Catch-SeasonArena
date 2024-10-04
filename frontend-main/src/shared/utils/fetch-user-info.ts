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
    console.log("Fetched rating 확인:", data.rating);

    dispatch(setUser({ email: data.email, nickname: data.nickname }));
    dispatch(setEquipment(data.equipment));
    dispatch(setRating(data.rating));
    console.log("Rating dispatched:", data.rating); // 여기서 rating 값이 제대로 전달되는지 확인

    navigate("/main");
  } catch (error) {
    console.error("로그인 후 사용자 정보 불러오기 실패:", error);
  }
};
