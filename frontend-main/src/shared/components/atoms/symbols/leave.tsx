import LeaveIcon from "@/assets/icons/leave-icon.svg?react";

interface LeaveProps {
  width?: string;
  height?: string;
  color?: string;
  className?: string;
}

export const Leave = ({ width, height, color, className }: LeaveProps) => {
  return (
    <LeaveIcon
      className={`${className || ""} ${color || ""}`} // className과 color를 동시 적용
      style={{
        width: width || "auto",
        height: height || "auto",
        display: "block",
      }}
    />
  );
};
