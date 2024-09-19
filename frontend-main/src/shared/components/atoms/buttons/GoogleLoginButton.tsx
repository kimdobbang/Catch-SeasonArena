import React from "react";
import { ReactComponent as GoogleLogin } from "@/assets/symbols/GoogleLoginButton.svg";
import styles from "./Button.module.css";

interface GoogleLoginButtonProps {
  onClick?: () => void;
}

export const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  onClick,
}) => {
  return (
    <GoogleLogin
      onClick={onClick}
      className={styles.button}
      aria-label="Google 로그인 버튼"
    />
  );
};
