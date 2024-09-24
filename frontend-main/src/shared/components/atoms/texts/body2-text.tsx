import React from "react";

interface Body2TextProps {
  children?: React.ReactNode;
  className?: string;
}

export const Body2Text: React.FC<Body2TextProps> = ({
  children,
  className,
}) => {
  return (
    <p className={`text-catch-gray-500 text-center text-body2 ${className}`}>
      {children}
    </p>
  );
};
