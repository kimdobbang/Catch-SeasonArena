import { tierRanges, getTierByRating } from "@/app/types/tier";
import { ProgressBar } from "../../atoms";
import { TierSmall } from "../../atoms/symbols/tiers/tier-small";

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
      className={`${className} gap-2 flex flex-row w-full h-auto justify-center items-center`}
    >
      <TierSmall rating={tier ? min : 0} size="big" />
      <ProgressBar rating={rating} />
      <TierSmall rating={tier ? max + 1 : 500} size="big" />
    </div>
  );
};
