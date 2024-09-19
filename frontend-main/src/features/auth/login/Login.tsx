import config from "@/config";
import React from "react";
import ServiceTitle from "@/assets/symbols/ServiceTitle.svg";
import LoginButton from "@/assets/symbols/DefaultLoginButton.svg";
import { KakaoLoginButton, GoogleLoginButton } from "@components/index";
// FSD 아키텍쳐를 활용하여 아래 주석처럼이 아닌 위와 같이 관리 가능
// import { KakaoLoginButton } from "@/shared/components/atoms/buttons/KakaoLoginButton";
// import { GoogleLoginButton } from "@/shared/components/atoms/buttons/GoogleLoginButton";

export const Login: React.FC = () => {
  const handleOAuthLogin = (provider: "kakao" | "google") => {
    window.location.href = `${config.API_BASE_URL}/api/auth/oauth2/authorization/${provider}`; // apiUrl 사용
  };

  return (
    <div>
      <ServiceTitle />
      <LoginButton />
      <KakaoLoginButton onClick={() => handleOAuthLogin("kakao")} />
      <GoogleLoginButton onClick={() => handleOAuthLogin("google")} />
    </div>
  );
};
