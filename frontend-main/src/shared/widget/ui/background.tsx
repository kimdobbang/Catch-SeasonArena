import { ReactNode } from "react";

interface BackgroundProps {
  className?: string; //className에 height를 꼭 넣어서 사용하기
  children?: ReactNode;
}

export const Background = ({ className, children }: BackgroundProps) => {
  return (
    <div
      className={`w-full bottom-0 -z-8 rounded-t-lg bg-catch-sub-100 ${className}`}
    >
      {children}
    </div>
  );
};
