import { tierRanges } from "@/app/types/tier";
import { Caption1Text, ProgressBar } from "../../atoms";
import { TierInitial } from "../../atoms/symbols/tiers/tier-initial";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

interface TierProgressProps {
  className?: string;
}

export const TierProgressBar = ({ className }: TierProgressProps) => {
  const { tier } = useSelector((state: RootState) => state.user);

  const min = tierRanges[tier].min;
  const max = tierRanges[tier].max;

  return (
    <div
      className={`${className} gap-2 flex flex-row w-full pr-3 pl-3 h-auto justify-center`}
    >
      <div className="mt-1">
        <TierInitial rating={tier ? min : 0} size="big" />
        <Caption1Text>{min}</Caption1Text>
      </div>

      <ProgressBar />
      <div>
        <TierInitial rating={tier ? max + 1 : 500} size="big" />
        <Caption1Text>{max}</Caption1Text>
      </div>
    </div>
  );
};
