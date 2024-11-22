import { Item } from "@/app/types/common";
import { Body2Text } from "@atoms/index";

// 컴포넌트: 합성 및 삭제 버튼 섹션
export const CombinationActionButtons = ({
  isCombinationSelected,
  onSet,
  onCancel,
  handleDeleteClick,
  item,
}: {
  isCombinationSelected: boolean;
  onSet: (item: Item) => void;
  onCancel: (item: Item) => void;
  handleDeleteClick: () => void;
  item: Item;
}) => (
  <div className="h-[15%] w-full flex items-center justify-center flex-col gap-1">
    <div className="flex flex-row items-center justify-around w-full h-full">
      {isCombinationSelected ? (
        <button onClick={() => onCancel(item)}>
          <Body2Text className="font-bold text-catch-gray-500">
            합성 취소
          </Body2Text>
        </button>
      ) : (
        <button onClick={() => onSet(item)}>
          <Body2Text className="font-bold text-catch-gray-500">
            합성 추가
          </Body2Text>
        </button>
      )}
      <button onClick={handleDeleteClick}>
        <Body2Text className="font-bold text-catch-system-color-error">
          삭제
        </Body2Text>
      </button>
    </div>
  </div>
);
