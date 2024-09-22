import Camera from "@/assets/icons/camera.svg?react";

interface CircleButtonProps {
  onClick?: () => void;
}

export const CircleButton: React.FC<CircleButtonProps> = ({ onClick }) => {
  return (
    <button
      className="flex items-center justify-center w-20 h-20 rounded-full bg-catch-sub-400"
      onClick={onClick}
    >
      <Camera className="w-[45px] h-[45px]" />
    </button>
  );
};
