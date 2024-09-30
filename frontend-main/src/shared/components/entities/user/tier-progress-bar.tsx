import { tierRanges, getTierByRating } from "@/app/types/tier";
import { Caption1Text, ProgressBar } from "../../atoms";
import { TierInitial } from "../../atoms/symbols/tiers/tier-initial";

interface TierProgressProps {
  rating: number;
  className?: string;
}

export const TierProgressBar: React.FC<TierProgressProps> = ({
  rating,
  className,
}) => {
  const tier = getTierByRating(rating);
  if (!tier || !tierRanges[tier]) {
    console.log("Invalid tier:", tier);
    return null; // 잘못된 tier 값 처리
  }
  const min = tierRanges[tier].min;
  const max = tierRanges[tier].max;

  console.log("min: ", min, ", max: ", max);

  return (
    <div
      className={`${className} gap-2 flex flex-row w-full h-auto justify-center`}
    >
      <div className="mt-1">
        <TierInitial rating={tier ? min : 0} size="big" />
        <Caption1Text>{min}</Caption1Text>
      </div>

      <ProgressBar rating={rating} />
      <div>
        <TierInitial rating={tier ? max + 1 : 500} size="big" />
        <Caption1Text>{max}</Caption1Text>
      </div>
    </div>
  );
};
