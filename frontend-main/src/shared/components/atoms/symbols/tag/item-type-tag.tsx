/* 아이템 타입 표시하는 태그 (무기, 액티브, 패시브) */
import { ItemType } from "@/app/types/common";

interface ItemTypeTagProps {
  type?: ItemType; // 아이템타입
  className?: string;
  color?: "orange" | "gray"; // 색깔
}

export const ItemTypeTag: React.FC<ItemTypeTagProps> = ({
  type = "sword",
  className,
  color,
}) => {
  const getColor = () => {
    switch (color) {
      case "orange":
        return "bg-catch-sub-400 text-catch-gray-000";
      case "gray":
        return "bg-catch-gray-200 text-catch-gray-300";
      default:
        return "bg-catch-sub-400 text-catch-gray-000";
    }
  };

  const getType = () => {
    switch (type) {
      case "sword":
        return "무기";
      case "active":
        return "액티브";
      case "passive":
        return "패시브";
      default:
        return "무기";
    }
  };
  return (
    <div
      className={`w-[60px] h-[24px] bg-catch-sub-400 shrink-0 text-center rounded-full ${className} ${getColor()}`}
    >
      <p className="text-white text-body2">{getType()}</p>
    </div>
  );
};
