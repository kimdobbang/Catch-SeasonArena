import React from "react";

interface Sub2TextProps {
  children?: React.ReactNode;
  className?: string;
}

export const Sub2Text = ({ children, className }: Sub2TextProps) => {
  return (
    <p
      className={`text-catch-gray-500 text-center text-sub2 font-bold ${className}`}
    >
      {children}
    </p>
  );
};
