import KakaoLogo from "@/assets/icons/kakao-logo.svg?react";
import { LoginButton } from "./logo-button";

export const KakaoLoginButton: React.FC<{ onClick?: () => void }> = ({
  onClick,
}) => {
  return (
    <LoginButton
      onClick={onClick}
      logo={<KakaoLogo />}
      bgColor="bg-[#FEE500]"
      text="카카오 로그인"
      textColor="text-catch-gray-999"
    />
  );
};
