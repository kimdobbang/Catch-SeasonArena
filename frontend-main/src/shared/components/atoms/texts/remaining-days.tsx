import { useState, useEffect } from "react";
import { Caption2Text } from "@atoms/index";

const calculateDaysUntilEndOfNovember = () => {
  const today = new Date();
  const endOfNovember = new Date(today.getFullYear(), 10, 30); // November is month 10 (zero-based)
  const timeDiff = endOfNovember.getTime() - today.getTime();
  const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  return daysRemaining >= 0 ? daysRemaining : 0;
};

export const RemainingDays = () => {
  const [daysRemaining, setDaysRemaining] = useState(
    calculateDaysUntilEndOfNovember(),
  );

  useEffect(() => {
    const timer = setInterval(
      () => {
        setDaysRemaining(calculateDaysUntilEndOfNovember());
      },
      24 * 60 * 60 * 1000,
    );

    return () => clearInterval(timer);
  }, []);

  return (
    <Caption2Text className="text-catch-sub-400">
      2024 Autumn 랭킹 마감까지 {daysRemaining}일 남았습니다.
    </Caption2Text>
  );
};
