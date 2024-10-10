import { memo } from "react";
import { formatTime } from "@/shared/utils/format";

export const Timer = memo(({ remainingTime }: { remainingTime: number }) => {
  return <p>예상 매칭 시간: {formatTime(remainingTime)}</p>;
});
