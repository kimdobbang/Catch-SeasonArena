// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Body1Text, PrimaryButton } from "@/shared/components/atoms";
import {
  TierProgressBar,
  UserNameContainer,
  CircleAvatar,
} from "@/shared/components/entities";
import { NavBarBackground } from "@/shared/ui";

export const Matching = () => {
  //   const navigate = useNavigate();
  const goToGamePage = () => {
    window.location.href = "/game";
  };

  const userRating = useSelector((state: RootState) => state.user.rating);
  const userAvatar = useSelector(
    (state: RootState) => state.user.selectedAvatar,
  );
  const userNickname = useSelector((state: RootState) => state.user.nickname);

  return (
    <div className="w-full h-full ">
      <div
        className="w-full h-[30%] flex flex-col items-center justify-center"
        style={{
          background:
            "linear-gradient(1deg, #FEF8EC -2.21%, rgba(254, 251, 245, 0.53) 51.4%, rgba(255, 255, 255, 0) 99.05%)",
        }}
      >
        <CircleAvatar
          avatarIcon={true}
          number={userAvatar}
          emotion="normal"
          width={96}
        />
      </div>
      <div className="w-full h-[70%] flex flex-col items-center gap-6">
        <UserNameContainer
          className="mt-4"
          nickname={userNickname}
          rating={userRating}
        />
        <TierProgressBar rating={userRating} />
        <div className="w-full px-4">
          {/* w-full로 부모 요소를 꽉 채우고 px-4로 padding 추가 */}
          <Body1Text className="!text-left text-catch-main-400 ">
            2024 Autumn
          </Body1Text>
        </div>
        <PrimaryButton
          onClick={goToGamePage}
          size="small"
          showIcon={true}
          color="main"
        >
          매칭시작
        </PrimaryButton>
      </div>
      <NavBarBackground className="mt-3" />
    </div>
  );
};
