import React from "react";
import Sword from "@/assets/icons/sword.svg?react";

interface PrimaryButtonProps {
  onClick?: () => void; // 버튼 클릭할때 실행될 함수
  color: "main" | "sub" | "white"; // 색깔
  size: "small" | "big"; // 크기
  children?: React.ReactNode; // 버튼 텍스트
  showIcon: boolean; // 아이콘 유무
  className?: string; // 추가 클래스 속성
}

const getColor = (color: string) => {
  switch (color) {
    case "main":
      return "bg-catch-main-400 text-white ";
    case "sub":
      return "bg-catch-sub-300 text-white ";
    case "white":
      return "bg-catch-gray-000 border-2 border-catch-main-400 text-catch-main-400";
    default:
      return "bg-catch-sub-300 text-white ";
  }
};

const getSize = (size: string) => {
  switch (size) {
    case "small":
      return "w-[200px] h-[45px] text-body1"; // Small button size
    case "big":
      return "w-[130px] h-[100px] text-sub2"; // Big button size
    default:
      return "w-[200px] h-[45px] text-body1"; // Default button size
  }
};

export const PrimaryButton = ({
  onClick,
  color,
  size,
  children,
  showIcon,
}: PrimaryButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${getColor(color)} ${getSize(size)} px-4 py-2 rounded-lg font-bold text-center flex items-center gap-2 justify-center`} // flex 설정 추가
    >
      {showIcon && (
        <span className="flex items-center">
          <Sword className="w-5 h-5" />
        </span>
      )}
      {children}
    </button>
  );
};
