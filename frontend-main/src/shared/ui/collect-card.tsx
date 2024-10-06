import {
  Body1Text,
  Caption1Text,
  CircleTag,
  ItemTypeTag,
  AutumnItemImage,
} from "../components/atoms";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Line } from "./line";
import { getDurability } from "../utils/format";
import { ItemGrade, ItemType } from "@/app/types/common";
export const CollectCard = ({ onClose }: { onClose: () => void }) => {
  const { name, itemId, type, grade, effect } = useSelector(
    (state: RootState) => state.success,
  );

  const durability = getDurability(grade as ItemGrade);
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
            <CircleTag
              grade={grade as ItemGrade}
              className="bg-catch-sub-200"
            />
            <button onClick={onClose} className="text-catch-sub-200 text-body1">
              X
            </button>
          </div>
          <div className="h-[75%] w-full flex flex-col justify-center gap-2 items-center">
            <div className="w-[100px] h-[100px] rounded-xl">
              <AutumnItemImage itemId={itemId} />
            </div>
            <Body1Text>{name}</Body1Text>
            <Line className="bg-catch-sub-300" />
            <Caption1Text>
              {durability}/{durability} hp
            </Caption1Text>
          </div>
          <div className="h-[20%] w-full flex items-center justify-center flex-col gap-1">
            <ItemTypeTag color="orange" type={type as ItemType} />
            <Caption1Text>{effect}</Caption1Text>
          </div>
        </div>
      </div>
    </div>
  );
};
