import { ReactNode } from "react";

interface CameraButtonProps {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
}
export const CameraButton = ({
  children,
  className,
  onClick,
}: CameraButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${className} focus:ring-4 focus:ring-catch-main-400 active:ring-2 active:ring-catch-main-200 flex items-center justify-center rounded-full bg-catch-sub-400 w-[70px] h-[70px]`}
      tabIndex={0} // 버튼에 포커스를 줄 수 있도록 tabindex 추가
    >
      <div className="rounded-full bg-catch-sub-300 w-[55px] h-[55px]"></div>
      {children}
    </button>
  );
};
