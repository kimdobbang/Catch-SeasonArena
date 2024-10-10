import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Body1Text, Body2Text } from "@/shared/components/atoms";
import { AutumnItemImage } from "@atoms/index";
import { useEffect } from "react";
import { clearSuccess } from "@/app/redux/slice/successSlice";

export const CollectTimerModal = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch();
  const { name, itemId } = useSelector((state: RootState) => state.success);
  // timeSlice 상태에서 collectTime 가져오기
  const collectTime = useSelector((state: RootState) => state.time.collectTime);

  useEffect(() => {
    const now = Date.now();
    const oneMinute = 60 * 1000;
    const timeDiff = now - collectTime;

    if (timeDiff >= oneMinute) {
      dispatch(clearSuccess());
      onClose(); // 1분이 지나면 모달을 자동으로 닫습니다.
    } else {
      const remainingTime = oneMinute - timeDiff;
      const timer = setTimeout(() => {
        dispatch(clearSuccess());
        onClose();
      }, remainingTime);

      return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머 해제
    }
  }, [collectTime, onClose, dispatch]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className={`relative w-[280px] rounded-lg h-[260px] bg-gradient-to-b bg-white`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center justify-center w-full h-full gap-2">
          <Body1Text className="font-medium">
            방금 수집한 <b>{name}</b>
          </Body1Text>
          <div className="w-[50%]">
            <AutumnItemImage itemId={itemId} />
          </div>
          <Body2Text>
            아이템 수집은 <br />
            <b>1분 후</b>에 다시 할 수 있어요!
          </Body2Text>
          <button
            onClick={onClose}
            className="w-16 h-8 text-white rounded-xl bg-catch-sub-400"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
