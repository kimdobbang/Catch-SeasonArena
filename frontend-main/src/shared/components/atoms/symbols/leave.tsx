import LeaveIcon from "@/assets/icons/leave-icon.svg?react";

interface LeaveProps {
  width?: string;
  height?: string;
  color?: string;
  className?: string;
}

export const Leave: React.FC<LeaveProps> = ({
  width,
  height,
  color,
  className,
}) => {
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
