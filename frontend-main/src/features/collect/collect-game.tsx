import { useNavigate } from "react-router-dom";
import {
  Body2Text,
  Caption1Text,
  PrimaryButton,
} from "@/shared/components/atoms";

export const CollectGame = () => {
  const navigate = useNavigate();
  const handleBtnClick = () => {
    navigate("/collect/result");
  };
  return (
    <div className="flex flex-col items-center w-full h-full ">
      <div className="flex flex-col justify-end h-[26%] w-full border-l-catch-gray-400 ">
        <Body2Text>아이템을 수집해 볼까요?</Body2Text>
        <Body2Text>
          타이밍을 맞춰 <b>수집하기</b>를 눌러주세요!
        </Body2Text>
        <Caption1Text>Tip! 중앙에 가까울수록 확률이 올라갑니다!</Caption1Text>
      </div>
      <div className="gap-9 flex flex-col items-center justify-center w-full h-full">
        <div className="bg-catch-gray-000 shadow-[2px_2px_5px_2px_rgba(0,0,0,0.25)] w-[276px] h-[276px] rounded-xl">
          사진찍은 이미지가 들어갑니다
        </div>
        <div className="w-[293px] h-[50px] bg-catch-sub-200 rounded-lg">
          타이밍 게임 DIV가 들어갈 자리입니다
        </div>
      </div>
      <div className="h-[24%] w-full flex flex-col items-center">
        <PrimaryButton
          onClick={handleBtnClick}
          color="main"
          size="small"
          showIcon={false}
        >
          수집하기
        </PrimaryButton>
      </div>
    </div>
  );
};
