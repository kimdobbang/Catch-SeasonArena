// src/app/api/authApi.ts
// 책임 분리
// 각 페이지: 상태관리, 스토리지 관리, API 처리 책임
// Api: API 호출과 서버 통신 책임
import config from "@/config";
import { UserInfo } from "@/app/types/userType";
import { UserState } from "@/app//redux/slice/userSlice";
export interface SignUpUserData {
  email: string;
  password: string;
}

export interface LoginUserData {
  email: string;
  password: string;
}

export const checkEmailExists = async (email: string): Promise<boolean> => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/auth/members/email/${encodeURIComponent(email)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  console.log(response.ok);
  if (response.ok) {
    return true;
  } else if (response.status === 400) {
    return false;
  } else {
    throw new Error(`서버 오류: ${response.statusText}`);
  }
};

export const signUpUser = async (
  userData: SignUpUserData,
): Promise<{ data: UserInfo; accessToken: string | null }> => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/auth/members/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(userData),
    },
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "회원가입 중 오류 발생");
  }

  const data = await response.json();
  const accessToken =
    response.headers.get("Authorization")?.split(" ")[1] || null;
  return { data, accessToken };
};

export const loginUser = async (
  userData: LoginUserData,
): Promise<{ data: UserInfo; accessToken: string | null }> => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/auth/members/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(userData),
    },
  );

  if (!response.ok) {
    console.log(response.status);
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "로그인 중 오류 발생");
  }
  const data = await response.json();
  const accessToken =
    response.headers.get("Authorization")?.split(" ")[1] || null;

  return { data, accessToken };
};

export const fetchUserInfo = async (
  accessToken: string,
): Promise<UserState> => {
  const response = await fetch(`${config.API_BASE_URL}/api/auth/members/info`, {
    headers: {
      method: "GET",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
  }
  const { data } = await response.json();
  console.log("authapi 요청 성공", data);
  return {
    ...data,
    rating: data.rating,
    selectedAvatar: Number(data.selectedAvatar),
    equipment: {
      weapon: data.equipment.weapon
        ? {
            inventoryId: data.equipment.weapon.inventoryId || null,
            itemId: data.equipment.weapon.itemId || null,
          }
        : {
            inventoryId: null,
            itemId: null,
          },
      active: data.equipment.active
        ? {
            inventoryId: data.equipment.active.inventoryId || null,
            itemId: data.equipment.active.itemId || null,
          }
        : {
            inventoryId: null,
            itemId: null,
          },
      passive: data.equipment.passive
        ? {
            inventoryId: data.equipment.passive.inventoryId || null,
            itemId: data.equipment.passive.itemId || null,
          }
        : {
            inventoryId: null,
            itemId: null,
          },
    },
  };
};
