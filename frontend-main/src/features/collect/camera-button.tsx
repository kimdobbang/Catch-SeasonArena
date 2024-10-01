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
      className={`${className} flex items-center justify-center rounded-full bg-catch-sub-400 w-[70px] h-[70px]`}
    >
      <div className="rounded-full bg-catch-sub-300 w-[55px] h-[55px]"></div>
      {children}
    </button>
  );
};
