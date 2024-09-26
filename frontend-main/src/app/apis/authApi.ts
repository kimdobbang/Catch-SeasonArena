// src/app/api/authApi.ts
// Redux와 책임 분리: API 요청 및 응답 처리. 토큰을 저장하거나, 서버와 통신하여 데이터를 받아오는 로직 처리.
import config from "@/config";
import { UserInfo } from "@/app/types/userType";

export interface JoinUserData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginUserData {
  email: string;
  password: string;
}

// 토큰 저장 함수
export const setToken = (token: string | null) => {
  if (token) {
    localStorage.setItem("token", token); // 토큰을 로컬 스토리지에 저장
  } else {
    localStorage.removeItem("token"); // 토큰을 제거
  }
};

// 토큰 가져오기 함수
export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

// 유저 가입 함수
export const joinUser = async (
  userData: UserInfo,
): Promise<{ data: UserInfo; token: string | null }> => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/auth/members/signup`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(userData), // 이메일, 비밀번호, 비밀번호 확인 정보 전달
    },
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message || "회원가입 중 오류 발생");
  }

  const data = await response.json();
  const token = response.headers.get("Authorization")?.split(" ")[1] || null;
  setToken(token);
  return { data, token };
};

// 유저 로그인 함수
export const loginUser = async (
  email: string,
  password: string,
): Promise<{ data: UserInfo; token: string | null }> => {
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
  const token = response.headers.get("Authorization")?.split(" ")[1] || null;
  setToken(token); // 로그인 성공 시 토큰 저장
  return { data, token };
};

// 사용자 정보 가져오기 함수
export const fetchUserInfo = async (): Promise<UserInfo> => {
  const token = getToken(); // local storage에서 gettoken
  if (!token) {
    throw new Error("토큰이 없습니다. or 로그인이 필요합니다.");
  }
  // 유저정보 main서버에 요청 api(명세에 없음)
  const response = await fetch(`${config.API_BASE_URL}/api/main/undefined`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
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
