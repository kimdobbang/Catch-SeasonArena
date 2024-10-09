import Camera from "@/assets/icons/camera.svg?react";
import Home from "@/assets/icons/home.svg?react";
import Inventory from "@/assets/icons/inventory.svg?react";

interface BottomNavButtonProps {
  onClick?: () => void;
  icon: "camera" | "home" | "inventory";
  shape: "circle" | "square";
  className?: string;
}

export const BottomNavButton = ({
  onClick,
  icon,
  shape,
  className,
}: BottomNavButtonProps) => {
  const getSquareBtnIcon = (icon: string) => {
    switch (icon) {
      case "inventory":
        return <Inventory className="w-[35px] h-[35px] text-catch-sub-400" />;
      case "home":
        return <Home className="w-[35px] h-[35px] text-catch-sub-400" />;
      default:
        return <Home className="w-[35px] h-[35px] text-catch-sub-400" />;
    }
  };

  return (
    <>
      {shape === "circle" && (
        <button
          className={`flex items-center justify-center w-20 h-20 rounded-full bg-catch-sub-400 ${className}`}
          onClick={onClick}
        >
          <Camera className="w-[45px] h-[45px]" />
        </button>
      )}

      {shape === "square" && (
        <button
          className={`flex items-center justify-center w-[60px] h-[60px] rounded-lg bg-catch-sub-200 ${className}`}
          onClick={onClick}
        >
          {getSquareBtnIcon(icon)}
        </button>
      )}
    </>
  );
};
