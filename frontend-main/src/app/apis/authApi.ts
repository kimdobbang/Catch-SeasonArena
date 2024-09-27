// src/app/api/authApi.ts
// 책임 분리
// 각 페이지: 상태관리, 스토리지 관리, API 처리 책임
// Api: API 호출과 서버 통신 책임
import config from "@/config";
import { UserInfo } from "@/app/types/userType";
// import { AppDispatch } from "@/app/redux/store";

export interface SignUpUserData {
  email: string;
  password: string;
}

export interface LoginUserData {
  email: string;
  password: string;
}

// 토큰 저장 함수
export const setAccessToken = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  } else {
    localStorage.removeItem("accessToken");
  }
};

// 토큰 가져오기 함수
export const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

// 이메일 중복 확인 API (쿼리 스트링 방식)
export const checkEmailExists = async (email: string): Promise<boolean> => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/auth/members/${encodeURIComponent(email)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  console.log("Checking email");
  console.log(response.ok);
  if (response.ok) {
    return true;
  } else if (response.status === 400) {
    return false;
  } else {
    throw new Error(`서버 오류: ${response.statusText}`);
  }
};

// 유저 가입 함수
export const signUpUser = async (
  userData: SignUpUserData,
): Promise<{ data: UserInfo; accessToken: string | null }> => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/auth/members/signup`,
    {
      method: "PUT",
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
  setAccessToken(accessToken);
  return { data, accessToken };
};

// 유저 로그인 함수
export const loginUser = async (
  email: string,
  password: string,
): Promise<{ data: UserInfo; accessToken: string | null }> => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/auth/members/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ email, password }),
    },
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "로그인 중 오류 발생");
  }

  const data = await response.json();
  const accessToken =
    response.headers.get("Authorization")?.split(" ")[1] || null;
  setAccessToken(accessToken); // 로그인 성공 시 토큰 저장
  return { data, accessToken };
};

// 사용자 정보 가져오기 함수
export const fetchUserInfo = async (): Promise<UserInfo> => {
  const accessToken = getAccessToken(); // local storage에서 getAccessTokentoken
  if (!accessToken) {
    throw new Error("토큰이 없습니다. or 로그인이 필요합니다.");
  }
  // 유저정보 main서버에 요청 api(명세에 없음)
  const response = await fetch(`${config.API_BASE_URL}/api/main/undefined`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json;charset=UTF-8",
    },
  });

  if (!response.ok) {
    throw new Error("사용자 정보를 가져오는 데 실패했습니다");
  }

  const result = await response.json();
  if (!result || !result.data) {
    throw new Error("잘못된 사용자 정보 응답");
  }
  return result.data;
};
