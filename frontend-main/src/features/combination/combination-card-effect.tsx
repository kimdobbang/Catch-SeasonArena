import { ItemType } from "@/app/types/common";
import { Caption1Text, ItemTypeTag } from "@/shared/components/atoms";

export const CombinationCardEffect = ({
  type,
  effect,
}: {
  type: ItemType;
  effect: string;
}) => (
  <div className="h-[20%] px-3 my-1 w-full flex items-center justify-center flex-col gap-1">
    <ItemTypeTag color="gray" type={type} />
    <Caption1Text>{effect}</Caption1Text>
  </div>
);
