import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Body1Text } from "@atoms/index";
import { MatchingButtons } from "@/features/index";
import {
  TierProgressBar,
  UserNameContainer,
  CircleAvatar,
  EquippedItems,
} from "@entities/index";
import { NavBarBackground } from "@ui/index";
import { useMatching } from "@/app/hooks/useMatching";
import { Timer } from "@/features/index";

const CircleAvatarMemo = React.memo(CircleAvatar);
const UserNameContainerMemo = React.memo(UserNameContainer);
const TierProgressBarMemo = React.memo(TierProgressBar);
const EquippedItemsMemo = React.memo(EquippedItems);

export const Matching = () => {
  const { email, nickname, rating, selectedAvatar, equipment } = useSelector(
    (state: RootState) => state.user,
  );

  const userEquipments = [equipment.weapon, equipment.active, equipment.passive]
    .filter((item) => item?.itemId !== null && item?.itemId !== undefined)
    .map((item) => item!.itemId as number);

  const {
    isMatchingStatus,
    expectation,
    connectAndSendMessage,
    disconnect,
    error,
  } = useMatching(email, nickname, rating, userEquipments, selectedAvatar);

  const [remainingTime, setRemainingTime] = useState<number>(
    expectation ? Number(expectation) : 0,
  );

  useEffect(() => {
    if (isMatchingStatus && remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isMatchingStatus, remainingTime]);

  useEffect(() => {
    setRemainingTime(expectation ? Number(expectation) : 0);
  }, [expectation]);

  const handleConnect = useCallback(() => {
    connectAndSendMessage();
  }, [connectAndSendMessage]);

  const handleDisconnect = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return (
    <div className="w-full h-full">
      <div className="w-full h-[20%] flex flex-col items-center justify-center">
        <CircleAvatarMemo
          avatarIcon={true}
          number={selectedAvatar}
          emotion="normal"
          width={96}
        />
      </div>

      <div className="w-full h-[35%] flex flex-col items-center gap-6">
        <UserNameContainerMemo className="mt-4" />
        <TierProgressBarMemo />
        <EquippedItemsMemo showCaption={true} />
      </div>

      <div className="w-full h-[20%] gap-3 flex flex-col items-center">
        {error && <div className="error-message">{error}</div>}
        <div className="w-full px-4">
          <Body1Text className="text-catch-main-400">2024 Autumn</Body1Text>
        </div>

        <Timer remainingTime={remainingTime} />

        <MatchingButtons
          isMatchingStatus={isMatchingStatus}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
        />
      </div>

      <NavBarBackground className="mt-3" />
    </div>
  );
};
