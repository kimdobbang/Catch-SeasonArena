import React from "react";
import { ReactComponent as KakaoLogin } from "@/assets/symbols/KakaoLoginButton.svg";
import styles from "./Button.module.css";

interface KakaoLoginButtonProps {
  onClick?: () => void;
}

export const KakaoLoginButton: React.FC<KakaoLoginButtonProps> = ({
  onClick,
}) => {
  return (
    <KakaoLogin
      onClick={onClick}
      className={styles.button}
      aria-label="Kakao 로그인 버튼"
    />
  );
};
