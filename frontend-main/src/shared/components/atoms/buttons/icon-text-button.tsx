import React from "react";

interface IconTextButtonProps {
  label: string;
  Icon?: React.ReactNode;
  showIcon?: boolean;
  iconSize?: string;
  onClick?: () => void;
  colorClass?: string;
  disabled?: boolean; // Add disabled prop
}

export const IconTextButton = ({
  label,
  Icon,
  showIcon = true,
  iconSize = "1em",
  onClick,
  colorClass = "text-catch-gray-300 border-catch-gray-300 active:bg-catch-gray-300 active:text-white",
  disabled = false, // Default to false
}: IconTextButtonProps) => {
  return (
    <button
      className={`w-20 px-2 py-1 text-caption1 transition duration-200 ease-in border rounded-lg focus:outline-none flex ${
        showIcon ? "items-center" : "text-center"
      } ${colorClass} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {showIcon && Icon && (
        <span className="mr-2" style={{ width: iconSize, height: iconSize }}>
          {Icon}
        </span>
      )}
      {label}
    </button>
  );
};
