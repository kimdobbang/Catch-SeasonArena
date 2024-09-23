import React from "react";

interface Caption2TextProps {
  children?: React.ReactNode;
  className?: string;
}

export const Caption2Text: React.FC<Caption2TextProps> = ({
  children,
  className,
}) => {
  return <p className={`text-center text-caption2 ${className}`}>{children}</p>;
};
