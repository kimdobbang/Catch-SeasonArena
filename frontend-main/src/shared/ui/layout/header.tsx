import { useLocation, useNavigate } from "react-router-dom";
import Arrow from "@/assets/icons/arrow-left.svg?react";

interface HeaderProps {
  className?: string;
  onClick?: () => void;
}

export const Header = ({ className, onClick }: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  // 기본 뒤로 가기 동작 설정
  const handleBackClick = () => {
    navigate(-1);
  };

  // URL에 따라 title과 showBackIcon(뒤로가기 버튼 표시 여부) 설정
  const getHeaderProps = () => {
    switch (location.pathname) {
      case "/main":
        return { title: "홈", showBackIcon: false };
      case "/ranking":
        return { title: "랭킹", showBackIcon: false };
      case "/avatar":
        return { title: "아바타", showBackIcon: true };
      case "/collectionbook":
        return { title: "가을 도감", showBackIcon: true };
      case "/inventory":
        return { title: "배낭", showBackIcon: true };
      case "/combine":
        return { title: "합성", showBackIcon: true };
      case "/matching":
        return { title: "시즌아레나", showBackIcon: true };

      // 경로를 추가하여 필요에 따라 title과 icon을 설정할 수 있음
      default:
        return { title: "홈", showBackIcon: false };
    }
  };

  // 현재 경로에 따른 title과 showBackIcon 결정
  const { title, showBackIcon } = getHeaderProps();

  return (
    <header
      className={`text-body1 flex flex-row gap-2 justify-start items-center h-[65px] font-bold ${className}`}
    >
      {/* showBackIcon이 true인 경우 아이콘과 onClick 동작 설정 */}
      {showBackIcon && (
        <Arrow
          className="ml-[24px] cursor-pointer"
          onClick={onClick || handleBackClick}
        />
      )}
      <h1>{title}</h1>
    </header>
  );
};
