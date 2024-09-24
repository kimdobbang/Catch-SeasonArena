import { Leave } from "@atoms/index";
import { LoginButton } from "./logo-button";

export const DefaultLoginButton: React.FC<{ onClick?: () => void }> = ({
  onClick,
}) => {
  return (
    <LoginButton
      onClick={onClick}
      logo={<Leave color="text-catch-sub-200" />}
      bgColor="bg-catch-sub-400"
      text="로그인"
      textColor="text-white"
    />
  );
};
