import {
  Body2Text,
  NewItemTag,
  PrimaryButton,
  TitleText,
} from "@/shared/components/atoms";
import { DescriptionBox } from "@/shared/components/entities";
import { useNavigate } from "react-router-dom";

export const ItemSuccess = () => {
  const navigate = useNavigate();
  const handleInventoryBtnClick = () => {
    navigate("/inventory");
  };
  const handleCollectBtnClick = () => {
    navigate("/collect");
  };
  return (
    <div className="flex flex-col w-full h-full ">
      <div className="w-full h-[23%] flex flex-col justify-center items-center">
        <NewItemTag />
        <TitleText color="green">SUCCESS</TitleText>
        <Body2Text>
          <b>코스모스</b> 아이템을
          <br />
          획득하였습니다
        </Body2Text>
      </div>

      <div className="w-full h-[50%] flex flex-col justify-center items-center">
        <img className="w-[200px] h-[200px] rounded-xl"></img>
        <DescriptionBox type="weapon" grade="rare" skill="스킬 이속 10% 증가" />
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
