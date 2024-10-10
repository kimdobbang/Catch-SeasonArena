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
  const lastCollectTime = useSelector(
    (state: RootState) => state.success.createdTime,
  );

  const goMain = () => {
    navigate("/main");
  };

  const goCollect = () => {
    /* 수집 후 1분이 지나지 않으면 다시 수집 불가능하게 하는 로직 추가 (모달 열기 등) */
    if (onTimerModalOpen && lastCollectTime != 0) {
      onTimerModalOpen();
    } else navigate("/collect");
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
