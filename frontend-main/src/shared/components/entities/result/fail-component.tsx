import { ResultLayout } from "@/shared/ui";
import {
  ItemResultButtons,
  ResultButtonsProps,
  ItemFailContent,
} from "@entities/index";

export const FailComponent = ({ behavior, isSuccess }: ResultButtonsProps) => {
  return (
    <ResultLayout
      title="FAILURE"
      contentComponent={<ItemFailContent behavior={behavior} />}
      buttonComponent={<ItemResultButtons isSuccess={isSuccess} />}
      behavior={behavior} // 합성 또는 수집에 따른 분기 처리
      isSuccess={isSuccess} // 실패 여부 전달
    />
  );
};
