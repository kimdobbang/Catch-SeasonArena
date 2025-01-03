import { TitleText } from "@atoms/index.ts";

export interface ResultLayoutProps {
  title?: string;
  contentComponent?: React.ReactNode;
  buttonComponent?: React.ReactNode;
  behavior?: "combine" | "collect";
  isSuccess?: boolean;
  isWin?: boolean;
}

export const ResultLayout = ({
  title,
  contentComponent,
  buttonComponent,
  isSuccess,
  isWin,
}: ResultLayoutProps) => {
  const getColor = () => {
    if (isWin !== undefined) {
      return isWin ? "blue" : "red";
    }
    return isSuccess ? "green" : "red";
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full h-[23%] flex justify-center flex-col items-center">
        <TitleText color={getColor()}>{title}</TitleText>{" "}
        {/* TitleText에 색상 전달 */}
      </div>
      <div className="w-full h-[50%] flex flex-col items-center">
        {contentComponent} {/* 중간에 있는 컨텐츠 컴포넌트 */}
      </div>
      <div className="w-full h-[27%] flex flex-row justify-center items-center gap-5">
        {buttonComponent} {/* 버튼들 */}
      </div>
    </div>
  );
};
