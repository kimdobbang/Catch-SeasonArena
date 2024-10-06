import { ResultLayout } from "@/shared/ui";
import {
  ItemResultButtons,
  ResultButtonsProps,
} from "../item/item-result-buttons";
import { ItemFailContent } from "../item/item-fail-content";

export const FailComponent = ({ behavior, isSuccess }: ResultButtonsProps) => {
  return (
    <ResultLayout
      title="FAILURE"
      contentComponent={<ItemFailContent behavior={behavior} />}
      buttonComponent={<ItemResultButtons isSuccess={isSuccess} />}
      behavior={behavior} // 합성 또는 수집에 따른 분기 처리
      isSuccess={false} // 실패 여부 전달
    />
  );
};
