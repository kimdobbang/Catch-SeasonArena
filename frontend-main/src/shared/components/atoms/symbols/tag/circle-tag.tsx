/*사람, 체크 모양 아이콘이나 등급표시(R,L,N)가 들어갑니다 */
import { itemGrade } from "@/app/Types/common";
import Check from "@/assets/icons/check.svg?react";
import Person from "@/assets/icons/person.svg?react";

interface CircleTagProps {
  icon?: string;
  grade?: itemGrade;
  className?: string;
}

export const CircleTag: React.FC<CircleTagProps> = ({
  icon,
  grade,
  className,
}) => {
  const getGrade = () => {
    switch (grade) {
      case "normal":
        return "N";
      case "rare":
        return "R";
      case "legend":
        return "L";
      default:
        return "N";
    }
  };

  const getIcon = () => {
    switch (icon) {
      case "person":
        return <Person />;
      case "check":
        return <Check />;
      default:
        return <Check />;
    }
  };

  return (
    // 사용시 bg-color를 꼭 설정해야 함
    <div
      className={`w-[26px] h-[26px] shrink-0 text-center rounded-full flex justify-center items-center ${className}`}
    >
      {grade && <p className="text-body2 text-white font-bold">{getGrade()}</p>}
      {icon && getIcon()}
    </div>
  );
};
