import { ResultLayout } from "@/shared/ui";
import { ResultButtons, ResultButtonsProps } from "./result-buttons";
import { FailContent } from "./fail-content";

export const FailComponent = ({ behavior, isSuccess }: ResultButtonsProps) => {
  return (
    <ResultLayout
      title="FAILURE"
      contentComponent={<FailContent behavior={behavior} />}
      buttonComponent={<ResultButtons isSuccess={isSuccess} />}
      behavior={behavior} // 합성 또는 수집에 따른 분기 처리
      isSuccess={false} // 실패 여부 전달
    />
  );
};
