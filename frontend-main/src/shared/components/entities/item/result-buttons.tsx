import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "@/shared/components/atoms";

export interface ResultButtonsProps {
  isSuccess?: boolean;
  behavior?: "combine" | "collect";
}

export const ResultButtons = ({ isSuccess }: ResultButtonsProps) => {
  const navigate = useNavigate();

  const handleInventoryBtnClick = () => {
    navigate(isSuccess ? "/inventory" : "/collectionbook");
  };

  const handleActionBtnClick = () => {
    navigate(isSuccess ? "/collectionbook" : "/collect");
  };

  return (
    <>
      <PrimaryButton
        showIcon={false}
        onClick={handleInventoryBtnClick}
        size="big"
        color="sub"
      >
        {isSuccess ? "배낭 보러가기" : "도감 보러가기"}
      </PrimaryButton>
      <PrimaryButton
        showIcon={false}
        onClick={handleActionBtnClick}
        size="big"
        color="main"
      >
        {isSuccess ? "도감 보러가기" : "수집하러 가기"}
      </PrimaryButton>
    </>
  );
};
