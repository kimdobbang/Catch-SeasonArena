import { ReactNode } from "react";

interface RankingButtonProps {
  title: string;
  isSelected: boolean;
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
}
export const RankingTabButton = ({
  title,
  isSelected,
  className,
  onClick,
}: RankingButtonProps) => {
  return (
    <button
      className={`${className} text-body2 ${
        isSelected ? "text-catch-main-400" : "text-catch-gray-500"
      } w-auto h-auto font-bold `}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
