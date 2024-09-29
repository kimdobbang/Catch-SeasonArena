import React from "react";
import Avatar1Body from "@/assets/symbols/avatars/avatar1-body.svg?react";
import Avatar2Body from "@/assets/symbols/avatars/avatar2-body.svg?react";
import Avatar3Body from "@/assets/symbols/avatars/avatar3-body.svg?react";
import Avatar4Body from "@/assets/symbols/avatars/avatar4-body.svg?react";

interface AvatarBodyProps {
  number: number; // 아바타 번호 (필수 입력)
  className?: string; // 추가 속성
  width?: string | number; // width와 height를 추가로 받아 스타일을 조정할 수 있도록 함
  height?: string | number;
}

export const AvatarBody: React.FC<AvatarBodyProps> = ({
  number,
  className = "",
  width,
  height,
}) => {
  const getAvatarBodyComponent = () => {
    switch (number) {
      case 1:
        return Avatar1Body;
      case 2:
        return Avatar2Body;
      case 3:
        return Avatar3Body;
      case 4:
        return Avatar4Body;
      default:
        return null;
    }
  };

  const AvatarBodyComponent = getAvatarBodyComponent();

  if (!AvatarBodyComponent) {
    return null;
  }

  return (
    <AvatarBodyComponent
      className={className}
      style={{ display: "block", width: width, height: height }} // 스타일에 width, height 적용
    />
  );
};
