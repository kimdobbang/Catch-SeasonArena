import React from "react";

interface Caption1TextProps {
  children?: React.ReactNode;
  className?: string;
}

export const Caption1Text: React.FC<Caption1TextProps> = ({
  children,
  className,
}) => {
  return (
    <p className={`text-catch-gray-300 text-center text-caption1 ${className}`}>
      {children}
    </p>
  );
};
