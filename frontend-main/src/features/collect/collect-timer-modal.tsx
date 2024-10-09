import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Body1Text, Body2Text } from "@/shared/components/atoms";
import { AutumnItemImage } from "@atoms/index";

export const CollectTimerModal = ({ onClose }: { onClose: () => void }) => {
  const { name, itemId } = useSelector((state: RootState) => state.success);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className={`relative w-[280px] rounded-lg h-[260px] bg-gradient-to-b bg-white`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full h-full flex flex-col gap-2 justify-center items-center">
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
