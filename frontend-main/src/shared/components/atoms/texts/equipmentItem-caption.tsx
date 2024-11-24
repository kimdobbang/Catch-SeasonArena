import { Caption2Text } from "@atoms/index";

export const EquipmentItemCaption = ({
  show,
  text,
}: {
  show: boolean;
  text: string;
}) => {
  if (!show) return null;

  return (
    <div className={"mt-1 text-xs text-center text-gray-500"}>
      <Caption2Text>{text}</Caption2Text>
    </div>
  );
};
