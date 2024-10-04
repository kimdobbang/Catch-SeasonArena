// src/app/api/memberApi.ts
import config from "@/config";

export const checkNicknameExists = async (
  accessToken: string,
  nickname: string,
): Promise<boolean> => {
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

  console.log(response.ok);

  if (response.ok) {
    return false; // 중복없으면 false (사용 가능)
  } else if (response.status === 400) {
    return true; // 중복이면 true(사용 불가)
  } else {
    throw new Error(`서버 오류: ${response.statusText}`);
  }
};

export const changeNicknameSave = async (
  accessToken: string,
  newNickname: string,
): Promise<void> => {
  try {
    const response = await fetch(
      `${config.API_BASE_URL}api/auth/members/nickname`,
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
