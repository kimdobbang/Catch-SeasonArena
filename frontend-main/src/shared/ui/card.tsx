import {
  Body1Text,
  Caption1Text,
  CircleTag,
  ItemTypeTag,
} from "../components/atoms";
import { Line } from "./line";

export const Card = ({ onClose }: { onClose: () => void }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="flex justify-center items-center p-2 w-[240px] rounded-lg h-[320px] bg-gradient-to-b from-catch-sub-400 to-catch-sub-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col justify-center w-full h-full bg-white rounded-md">
          <div className="h-[5%] w-full justify-between flex p-2 mt-2">
            <CircleTag grade="rare" className="bg-catch-sub-200" />
            <button onClick={onClose} className="text-catch-sub-200 text-body1">
              X
            </button>
          </div>
          <div className="h-[75%] w-full flex flex-col justify-center gap-2 items-center">
            <img className="w-[100px] h-[100px] rounded-xl" src=""></img>
            <Body1Text>이름</Body1Text>
            <Line className="bg-catch-sub-300" />
            <Caption1Text>10/10 hp</Caption1Text>
          </div>
          <div className="h-[20%] w-full flex items-center justify-center flex-col gap-1">
            <ItemTypeTag color="orange" type="weapon" />
            <Caption1Text>뒤로넉백</Caption1Text>
          </div>
        </div>
      </div>
    </div>
  );
};
