import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Body1Text, Body2Text } from "@/shared/components/atoms";
import { AutumnItemImage } from "@atoms/index";

export const CollectTimerModal = ({ onClose }: { onClose: () => void }) => {
  const { name, itemId } = useSelector((state: RootState) => state.success);
  // timeSlice 상태에서 collectTime 가져오기
  const collectTime = useSelector((state: RootState) => state.time.collectTime);

  // collectTime이 0이면 모달을 열지 않음
  if (collectTime === 0) {
    onClose();
    return null; // 모달을 렌더링하지 않음
  }

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
