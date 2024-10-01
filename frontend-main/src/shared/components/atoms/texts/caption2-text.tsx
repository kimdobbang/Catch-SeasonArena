import React from "react";

interface Caption2TextProps {
  children?: React.ReactNode;
  className?: string;
}

export const Caption2Text = ({ children, className }: Caption2TextProps) => {
  return <p className={`text-center text-caption2 ${className}`}>{children}</p>;
};
