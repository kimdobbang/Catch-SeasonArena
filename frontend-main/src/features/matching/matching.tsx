import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { PrimaryButton, Body1Text, Caption2Text } from "@atoms/index";
import {
  TierProgressBar,
  UserNameContainer,
  CircleAvatar,
  EquippedItems,
} from "@entities/index";
import { NavBarBackground } from "@ui/index";
import { formatTime } from "@/shared/utils/format";
import { useMatching } from "@/app/hooks/useMatching";

export const Matching = () => {
  const { nickname, rating, selectedAvatar, equipment } = useSelector(
    (state: RootState) => state.user,
  );

  const { isMatchingStatus, expectation, connectAndSendMessage, disconnect } =
    useMatching(nickname, rating, equipment, selectedAvatar);

  return (
    <div className="w-full h-full">
      <div className="w-full h-[20%] flex flex-col items-center justify-center">
        <CircleAvatar
          avatarIcon={true}
          number={selectedAvatar}
          emotion="normal"
          width={96}
        />
      </div>

      <div className="w-full h-[35%] flex flex-col items-center gap-6">
        <UserNameContainer className="mt-4" />
        <TierProgressBar />
        <EquippedItems showCaption={true} />
      </div>

      <div className="w-full h-[20%] gap-3 flex flex-col items-center">
        <div className="w-full px-4">
          <Body1Text className="text-catch-main-400">2024 Autumn</Body1Text>
        </div>
        <div className="flex items-center justify-center">
          {!isMatchingStatus ? (
            <div>
              <PrimaryButton
                showIcon={true}
                onClick={connectAndSendMessage}
                size="small"
                color="main"
              >
                매칭시작
              </PrimaryButton>
              <Caption2Text className="text-catch-gray-300">
                배틀에 사용할 장착 수집물을 확인하세요
              </Caption2Text>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <p>예상 매칭 시간: {formatTime(expectation)}</p>
              <PrimaryButton
                showIcon={false}
                onClick={disconnect}
                size="small"
                color="white"
              >
                매칭 취소
              </PrimaryButton>
              <Caption2Text className="text-catch-gray-300">
                주의! 매칭 완료 후 탈주하면 레이팅이 감소해요
              </Caption2Text>
            </div>
          )}
        </div>
      </div>
      <NavBarBackground className="mt-3"></NavBarBackground>
    </div>
  );
};
