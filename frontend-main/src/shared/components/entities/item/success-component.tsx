import { ResultLayout } from "@/shared/ui";
import { ResultButtons, ResultButtonsProps } from "./result-buttons";
import { SuccessContent } from "./success-content";

export const SuccessComponent = ({
  isSuccess,
  behavior,
}: ResultButtonsProps) => {
  return (
    <ResultLayout
      title="SUCCESS"
      contentComponent={<SuccessContent behavior={behavior} />} // 성공 메시지 컴포넌트
      buttonComponent={<ResultButtons isSuccess={isSuccess} />}
      behavior={behavior} // collect 또는 combine에 따른 동작
      isSuccess={true} // 성공 여부 전달
    />
  );
};
