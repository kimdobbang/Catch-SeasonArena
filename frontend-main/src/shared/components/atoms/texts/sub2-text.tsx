import React from "react";

interface Sub2TextProps {
  children?: React.ReactNode;
  className?: string;
}

export const Sub2Text: React.FC<Sub2TextProps> = ({ children, className }) => {
  return (
    <p
      className={`text-catch-gray-500 text-center text-sub2 font-bold ${className}`}
    >
      {children}
    </p>
  );
};
