import { AvatarBody } from "@atoms/index";

interface AvatarCollectButtonProps {
  number: number;
  className?: string;
  isSelected: boolean;
  onClick?: () => void;
}

export const AvatarCollectButton = ({
  number,
  className,
  isSelected,
  onClick,
}: AvatarCollectButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-[132px] h-[200px] rounded-lg border-2 flex items-center justify-center ${
        isSelected
          ? "bg-gradient-to-b from-catch-sub-100 to-catch-sub-400 border-catch-sub-300" // 선택된 버튼 스타일
          : "bg-white border-catch-sub-300"
      }  ${className}`}
    >
      <AvatarBody number={number} className={className} height={140} />
    </button>
  );
};
