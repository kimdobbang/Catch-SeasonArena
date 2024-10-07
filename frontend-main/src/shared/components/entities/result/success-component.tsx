import { ResultLayout } from "@/shared/ui";
import {
  ItemResultButtons,
  ResultButtonsProps,
} from "../item/item-result-buttons";
import { ItemSuccessContent } from "../item/item-success-content";

export const SuccessComponent = ({
  isSuccess,
  behavior,
}: ResultButtonsProps) => {
  return (
    <ResultLayout
      title="SUCCESS"
      contentComponent={<ItemSuccessContent behavior={behavior} />} // 성공 메시지 컴포넌트
      buttonComponent={<ItemResultButtons isSuccess={isSuccess} />}
      behavior={behavior} // collect 또는 combine에 따른 동작
      isSuccess={true} // 성공 여부 전달
    />
  );
};
