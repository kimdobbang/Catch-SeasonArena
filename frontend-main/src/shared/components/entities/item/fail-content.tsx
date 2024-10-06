import { AvatarFace, Sub2Text } from "@/shared/components/atoms";
import { ResultButtonsProps } from "./result-buttons";

export const FailContent = ({ behavior }: ResultButtonsProps) => {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <AvatarFace number={1} emotion="sad" />
      {behavior === "collect" ? (
        <Sub2Text>
          수집 가능한 아이템인지
          <br />
          도감을 확인해주세요!
        </Sub2Text>
      ) : (
        <Sub2Text>
          아이템 합성을
          <br />
          실패하였습니다
        </Sub2Text>
      )}
    </div>
  );
};
