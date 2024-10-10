import { BottomNavButton } from "@/shared/components/atoms/buttons/bottom-nav-button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

interface BottomNavBarProps {
  className?: string;
  onTimerModalOpen?: () => void;
}

export const BottomNavBar = ({
  className,
  onTimerModalOpen,
}: BottomNavBarProps) => {
  const navigate = useNavigate();
  const collectTime = useSelector((state: RootState) => state.time.collectTime);

  const goMain = () => {
    navigate("/main");
  };

  const goCollect = () => {
    const now = Date.now();
    const timeDiff = now - collectTime;
    const oneMinute = 60 * 1000;

    if (collectTime !== 0 && timeDiff < oneMinute) {
      if (onTimerModalOpen) {
        onTimerModalOpen(); // 1분 이내면 모달을 엽니다.
      }
    } else {
      navigate("/collect"); // 1분이 지났다면 수집 페이지로 이동.
    }
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
