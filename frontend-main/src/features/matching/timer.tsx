import { memo } from "react";
import { formatTime } from "@/shared/utils/format";
import { Body2Text } from "@atoms/index";

export const Timer = memo(({ remainingTime }: { remainingTime: number }) => {
  return (
    <Body2Text className="text-catch-sub-400">
      예상 매칭 시간 {formatTime(remainingTime)}
    </Body2Text>
  );
});
