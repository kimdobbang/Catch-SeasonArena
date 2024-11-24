import React from "react";

interface Body1TextProps {
  children?: React.ReactNode;
  className?: string;
}

export const Body1Text = ({ children, className }: Body1TextProps) => {
  return (
    <p
      className={`text-catch-gray-500 text-center text-body1 font-bold ${className}`}
    >
      {children}
    </p>
  );
};
