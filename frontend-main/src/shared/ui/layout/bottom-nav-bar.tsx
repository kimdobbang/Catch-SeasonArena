import { BottomNavButton } from "@/shared/components/atoms/buttons/bottom-nav-button";
import { useNavigate } from "react-router-dom";

interface BottomNavBarProps {
  className?: string;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ className }) => {
  const navigate = useNavigate();

  const goMain = () => {
    navigate("/main");
  };

  const goCollect = () => {
    navigate("/collect");
  };

  const goInventory = () => {
    navigate("/inventory");
  };

  return (
    <div
      className={`z-10 flex flex-col items-center justify-end h-[170px] ${className}`}
    >
      <div className="flex flex-row items-end w-full justify-evenly">
        <BottomNavButton shape="square" icon="home" onClick={goMain} />
        <BottomNavButton shape="circle" icon="camera" onClick={goCollect} />
        <BottomNavButton
          shape="square"
          icon="inventory"
          onClick={goInventory}
        />
      </div>
      <div className="flex flex-row items-center w-full gap-4 mt-2 mb-2 text-catch-sub-300 justify-evenly">
        <h2>홈&nbsp;&nbsp;&nbsp;</h2>
        <h2>수집</h2>
        <h2>배낭</h2>
      </div>
    </div>
  );
};
