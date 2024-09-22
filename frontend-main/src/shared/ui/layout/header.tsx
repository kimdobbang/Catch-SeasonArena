import { useLocation, useNavigate } from "react-router-dom";
import Arrow from "@/assets/icons/arrow-left.svg?react";

interface HeaderProps {
  className?: string;
  onClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ className, onClick }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // 기본 뒤로 가기 동작 설정
  const handleBackClick = () => {
    navigate(-1);
  };

  // URL에 따라 title과 showIcon 설정
  const getHeaderProps = () => {
    switch (location.pathname) {
      case "/main":
        return { title: "홈", showIcon: false };
      case "/ranking":
        return { title: "랭킹", showIcon: false };
      case "/avartar":
        return { title: "아바타", showIcon: true };
      case "/dictionary":
        return { title: "김싸피의 가을 도감", showIcon: true };
      case "/inventory":
        return { title: "배낭", showIcon: true };
      case "/combine":
        return { title: "합성", showIcon: true };
      case "/matching":
        return { title: "시즌아레나", showIcon: true };

      // 경로를 추가하여 필요에 따라 title과 icon을 설정할 수 있음
      default:
        return { title: "홈", showIcon: false };
    }
  };

  // 현재 경로에 따른 title과 showIcon 결정
  const { title, showIcon } = getHeaderProps();

  return (
    <header
      className={`text-body1 flex flex-row gap-2 justify-start items-center h-[65px] font-bold ${className}`}
    >
      {/* showIcon이 true인 경우 아이콘과 onClick 동작 설정 */}
      {showIcon && (
        <Arrow className="ml-[24px]" onClick={onClick || handleBackClick} />
      )}
      <h1>{title}</h1>
    </header>
  );
};
