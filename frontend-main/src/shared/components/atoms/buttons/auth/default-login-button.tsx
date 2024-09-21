import { Sleaves } from "@atoms/index";
import { LoginButton } from "./logo-button";

export const DefaultLoginButton: React.FC<{ onClick?: () => void }> = ({
  onClick,
}) => {
  return (
    <LoginButton
      onClick={onClick}
      logo={<Sleaves color="text-catch-sub-200" />} // Tailwind CSS 색상 클래스 적용
      bgColor="bg-catch-sub-400"
      text="로그인"
      textColor="text-white"
    />
  );
};
