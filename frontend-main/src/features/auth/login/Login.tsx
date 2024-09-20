import config from "@/config";
import React from "react";
import ServiceTitle from "@/assets/symbols/ServiceTitle.svg";
import LoginButton from "@/assets/symbols/DefaultLoginButton.svg";
import { KakaoLoginButton, GoogleLoginButton } from "@components/atoms/index";

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
