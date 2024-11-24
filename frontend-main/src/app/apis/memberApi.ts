/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/memberApi.ts
import config from "@/config";
import axios from "axios";
import { setSelectedAvatar } from "@/app/redux/slice/userSlice"; // 액션을 가져옵니다.

// 닉네임 중복 확인 API
export const checkNicknameExists = async (
  accessToken: string,
  nickname: string,
): Promise<{ isDuplicate: boolean; error?: string }> => {
  try {
    const response = await fetch(
      `${config.API_BASE_URL}/api/auth/members/nickname/${encodeURIComponent(nickname)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (response.ok) {
      return { isDuplicate: false }; // 중복 없으면 false 반환
    } else if (response.status === 400) {
      return { isDuplicate: true }; // 중복이면 true 반환
    } else {
      return { isDuplicate: false, error: `서버 오류: ${response.statusText}` };
    }
  } catch (error) {
    console.error("중복확인 API 호출 실패:", error);
    return { isDuplicate: false, error: "잠시후 다시 시도해주세요" };
  }
};

export const changeNicknameSave = async (
  accessToken: string,
  newNickname: string,
): Promise<void> => {
  try {
    const response = await fetch(
      `${config.API_BASE_URL}/api/auth/members/nickname`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ nickname: newNickname }),
      },
    );

    if (!response.ok) {
      throw new Error(`서버 오류: ${response.statusText}`);
    }
  } catch (error) {
    console.error("닉네임 변경 중 오류 발생:", error);
    throw error;
  }
};

// 아바타 변경 API
export const changeAvatarSave = async (
  selectAvatar: number,
  accessToken: string,
  dispatch: any,
) => {
  try {
    const response = await axios.patch(
      `${config.API_BASE_URL}/api/auth/members/avatar`,
      {
        avatar: selectAvatar,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log("변경 결과: ", response);
    // Redux 상태 업데이트
    if (response.status === 200) {
      dispatch(setSelectedAvatar(selectAvatar));
    }
  } catch {
    console.log("에러");
  }
};
