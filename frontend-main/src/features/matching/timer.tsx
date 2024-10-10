import { memo } from "react";
import { formatTime } from "@/shared/utils/format";
import { Body1Text } from "@/shared/components/atoms";

export const Timer = memo(({ remainingTime }: { remainingTime: number }) => {
  return (
    <Body1Text className="font-bold">
      예상 매칭 시간: {formatTime(remainingTime)}
    </Body1Text>
  );
});
