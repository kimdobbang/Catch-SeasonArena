import GoogleLogo from "@/assets/icons/google-logo.svg?react";
import { LoginButton } from "./logo-button";

interface GoogleLoginButtonProps {
  onClick?: () => void;
}

export const GoogleLoginButton = ({ onClick }: GoogleLoginButtonProps) => {
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
