// import Ranking from "@/assets/icons/ranking.svg?react";
// import CollectionBook from "@/assets/icons/collectionbook.svg?react";
// import CardGame from "@/assets/icons/card-game.svg";

import { Caption1Text } from "../texts/caption1-text";

interface SquareIconButtonProps {
  icon: React.ReactNode; // 버튼에 넣을 아이콘- ranking, collectionbook, card-game 이 들어갈 수 있음
  label: string;
  className?: string;
  onClick?: () => void;
}

export const SquareIconButton = ({
  icon,
  label,
  className,
  onClick,
}: SquareIconButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={`${className} flex flex-col items-center w-auto cursor-pointer z-20`}
    >
      {/* 버튼 아이콘 */}
      <button className="flex items-center justify-center w-[60px] h-[60px] bg-white border-2 rounded-lg border-catch-main-400">
        {icon}
      </button>
      {/* 텍스트 */}
      <Caption1Text className="text-center text-catch-gray-500">
        {label}
      </Caption1Text>
    </div>
  );
};
