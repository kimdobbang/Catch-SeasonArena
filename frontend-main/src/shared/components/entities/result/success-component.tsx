import { ResultLayout } from "@/shared/ui";
import { ItemResultButtons, ResultButtonsProps } from "./item-result-buttons";
import { ItemProps, ItemSuccessContent } from "@entities/index";

export const SuccessComponent = ({
  isSuccess,
  behavior,
  item,
}: ResultButtonsProps & { item?: ItemProps }) => {
  return (
    <ResultLayout
      title="SUCCESS"
      contentComponent={<ItemSuccessContent behavior={behavior} item={item} />} // 성공 메시지 컴포넌트
      buttonComponent={<ItemResultButtons isSuccess={isSuccess} />}
      behavior={behavior} // collect 또는 combine에 따른 동작
      isSuccess={isSuccess} // 성공 여부 전달
    />
  );
};
