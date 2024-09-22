import Home from "@/assets/icons/home.svg?react";
import Inventory from "@/assets/icons/inventory.svg?react";

interface SquareButtonProps {
  onClick?: () => void;
  icon: "inventory" | "home";
}

export const SquareButton: React.FC<SquareButtonProps> = ({
  onClick,
  icon,
}) => {
  const getIcon = (icon: string) => {
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
    <button
      className="flex items-center justify-center w-[60px] h-[60px] rounded-lg bg-catch-sub-200"
      onClick={onClick}
    >
      {getIcon(icon)}
    </button>
  );
};
