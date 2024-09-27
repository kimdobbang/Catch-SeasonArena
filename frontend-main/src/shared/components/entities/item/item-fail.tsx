import { useNavigate } from "react-router-dom";
import { PrimaryButton, Sub2Text, TitleText } from "@/shared/components/atoms";
import Avartar from "@/assets/symbols/avartar1.svg?react";

export const ItemFail = () => {
  const navigate = useNavigate();
  const handleInventoryBtnClick = () => {
    navigate("/inventory");
  };
  const handleCollectBtnClick = () => {
    navigate("/collect");
  };
  return (
    <div className="flex flex-col w-full h-full ">
      <div className="w-full h-[23%] flex justify-center flex-col items-center">
        <TitleText color="red">FAILURE</TitleText>
      </div>
      <div className="w-full h-[50%] flex flex-col  items-center">
        <Avartar className="w-[360px] h-[360px]" />
        <Sub2Text>
          수집 가능한 아이템인지
          <br />
          도감을 확인해주세요!
        </Sub2Text>
      </div>
      <div className="w-full h-[27%] flex flex-row justify-center items-center gap-5">
        <PrimaryButton
          showIcon={false}
          onClick={handleInventoryBtnClick}
          size="big"
          color="sub"
        >
          배낭 보러가기
        </PrimaryButton>
        {/*수집후 N분간 수집 불가 로직 추가 */}
        <PrimaryButton
          showIcon={false}
          onClick={handleCollectBtnClick}
          size="big"
          color="main"
        >
          다시 수집하기
        </PrimaryButton>
      </div>
    </div>
  );
};
