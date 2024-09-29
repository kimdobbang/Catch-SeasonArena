import React from "react";
import Avatar1 from "@/assets/symbols/avatars/avatar1.svg?react";
import Avatar1Sad from "@/assets/symbols/avatars/avatar1-sad.svg?react";
import Avatar2 from "@/assets/symbols/avatars/avatar2.svg?react";
import Avatar2Sad from "@/assets/symbols/avatars/avatar2-sad.svg?react";
import Avatar3 from "@/assets/symbols/avatars/avatar3.svg?react";
import Avatar3Sad from "@/assets/symbols/avatars/avatar3-sad.svg?react";
import Avatar4 from "@/assets/symbols/avatars/avatar4.svg?react";
import Avatar4Sad from "@/assets/symbols/avatars/avatar4-sad.svg?react";

interface AvatarFaceProps {
  number: number; // 아바타 번호(필수입력)
  emotion: "normal" | "sad"; // 감정(필수입력)
  className?: string; // 추가 적용할 속성
  width?: string | number; // width와 height 설정 가능 (10 or 10px 둘다 가능)
  height?: string | number;
}

export const AvatarFace: React.FC<AvatarFaceProps> = ({
  number,
  emotion = "normal",
  className = "",
  width,
  height,
}) => {
  const getAvatarComponent = () => {
    switch (number) {
      case 1:
        return emotion === "sad" ? Avatar1Sad : Avatar1;
      case 2:
        return emotion === "sad" ? Avatar2Sad : Avatar2;
      case 3:
        return emotion === "sad" ? Avatar3Sad : Avatar3;
      case 4:
        return emotion === "sad" ? Avatar4Sad : Avatar4;
      default:
        return null;
    }
  };

  const AvatarComponent = getAvatarComponent();

  if (!AvatarComponent) {
    return null;
  }

  return (
    <AvatarComponent
      className={className}
      style={{ display: "block", width: width, height: height }} // 스타일에 width, height 적용
    />
  );
};
