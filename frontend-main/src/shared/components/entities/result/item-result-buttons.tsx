import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "@/shared/components/atoms";
import { useDispatch } from "react-redux";
import { clearSuccess } from "@/app/redux/slice/successSlice";

export interface ResultButtonsProps {
  isSuccess?: boolean;
  behavior?: "combine" | "collect";
}

export const ItemResultButtons = ({
  isSuccess,
  behavior,
}: ResultButtonsProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFirstBtnClick = () => {
    if (behavior === "collect") {
      dispatch(clearSuccess());
    }
    // 성공 시 도감으로, 실패 시 배낭으로 이동
    navigate(isSuccess ? "/collectionbook" : "/inventory");
  };

  const handleCombinationBtnClick = () => {
    if (behavior === "collect") {
      dispatch(clearSuccess());
    }
    navigate("/combination");
  };

  return (
    <>
      {/*수집후 N분간 수집 불가 로직 추가해야함 */}
      <PrimaryButton
        showIcon={false}
        onClick={handleFirstBtnClick}
        size="big"
        color="sub"
      >
        {isSuccess ? "도감 보러가기" : "배낭 보러가기"}
      </PrimaryButton>
      <PrimaryButton
        showIcon={false}
        onClick={handleCombinationBtnClick}
        size="big"
        color="main"
      >
        합성하러가기
      </PrimaryButton>
    </>
  );
};
