import GoogleLogo from "@/assets/icons/google-logo.svg?react";
import { LoginButton } from "./logo-button";

export const GoogleLoginButton: React.FC<{ onClick?: () => void }> = ({
  onClick,
}) => {
  return (
    <LoginButton
      onClick={onClick}
      logo={<GoogleLogo />}
      bgColor="bg-catch-gray-200"
      text="구글 로그인"
      textColor="text-catch-gray-999"
    />
  );
};
