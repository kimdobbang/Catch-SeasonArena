import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { MatchingButtons } from "@/features/index";
import {
  TierProgressBar,
  UserNameContainer,
  CircleAvatar,
  EquippedItems,
} from "@entities/index";
import { useMatching } from "@/app/hooks/useMatching";

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
    <div className="flex flex-col w-full h-full">
      <div className="w-full h-[20%] flex flex-col items-center justify-center">
        <CircleAvatarMemo
          avatarIcon={false}
          number={selectedAvatar}
          emotion="normal"
          width={96}
        />
      </div>

      <div className="w-full h-[35%] flex flex-col items-center gap-7 mb-5">
        <UserNameContainerMemo className="mt-4" />
        <TierProgressBarMemo />
        <EquippedItemsMemo showCaption={true} />
      </div>

      <div className="w-full h-[45%] gap-6 flex flex-col items-center justify-center bg-catch-sub-100 rounded-t-lg">
        {error && <div className="error-message">{error}</div>}

        <MatchingButtons
          isMatchingStatus={isMatchingStatus}
          remainingTime={remainingTime}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
        />
      </div>
    </div>
  );
};
