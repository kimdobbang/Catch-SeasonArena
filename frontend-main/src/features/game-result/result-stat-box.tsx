import { Body1Text, Body2Text } from "@atoms/index";

export const GameResultStatBox = ({
  value,
  caption,
}: {
  value: string | number;
  caption: string;
}) => {
  return (
    <div className="flex flex-col items-center">
      {/* 박스 내부 */}
      <div className="flex items-center justify-center w-20 h-20 border rounded-lg border-catch-sub-200">
        <Body1Text>{value}</Body1Text>
      </div>
      <Body2Text className="text-catch-sub-400">{caption}</Body2Text>
    </div>
  );
};
