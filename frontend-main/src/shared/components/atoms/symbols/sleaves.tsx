import SleavesIcon from "@/assets/icons/sleave-icon.svg?react";

interface SleavesProps {
  width?: string;
  height?: string;
  color?: string;
}

export const Sleaves: React.FC<SleavesProps> = ({ width, height, color }) => {
  return (
    <SleavesIcon
      className={color}
      style={{
        width: width ? width : "auto",
        height: height ? height : "auto",
        display: "block",
      }}
    />
  );
};
