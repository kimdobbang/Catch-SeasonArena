import {
  PrimaryButton,
  Caption2Text,
  Caption1Text,
  Body2Text,
} from "@atoms/index";
import { memo, useState, useEffect } from "react";
import { Timer } from "@/features/index";
import { SeasonRemainingDays } from "@/shared/utils/format";

export const MatchingButtons = memo(
  ({
    isMatchingStatus,
    remainingTime,
    onConnect,
    onDisconnect,
  }: {
    isMatchingStatus: boolean;
    remainingTime: number;
    onConnect: () => void;
    onDisconnect: () => void;
  }) => {
    const [daysRemaining, setDaysRemaining] = useState(0);

    useEffect(() => {
      const days = SeasonRemainingDays(); // 남은 일수 계산
      setDaysRemaining(days);
    }, []);

    return (
      <div className="flex flex-col items-center justify-center gap-5">
        {isMatchingStatus ? (
          <>
            <Timer remainingTime={remainingTime} />
            <PrimaryButton
              showIcon={false}
              onClick={onDisconnect}
              size="small"
              color="white"
            >
              매칭 취소
            </PrimaryButton>
            <Caption1Text className="text-catch-gray-300">
              주의! 매칭취소를 하지 않고 탈주하면 레이팅이 감소해요
            </Caption1Text>
          </>
        ) : (
          <>
            <Body2Text className="text-catch-main-400">
              Autumn 시즌 랭킹마감 D- {daysRemaining}일
            </Body2Text>
            <PrimaryButton
              showIcon={true}
              onClick={onConnect}
              size="small"
              color="main"
            >
              매칭시작
            </PrimaryButton>
            <Caption2Text className="text-catch-gray-300">
              배틀에 사용할 장착 수집물을 확인하세요
            </Caption2Text>
          </>
        )}
      </div>
    );
  },
);
