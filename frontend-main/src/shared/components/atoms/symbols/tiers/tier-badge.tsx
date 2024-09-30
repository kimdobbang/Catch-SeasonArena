// 티어 아이콘 큰거 작은거 두가진데 svg소스 다있나몰라
import BronzeTier from "@/assets/symbols/tiers/tier-bronze.svg?react";
import SilverTier from "@/assets/symbols/tiers/tier-silver.svg?react";
import GoldTier from "@/assets/symbols/tiers/tier-gold.svg?react";
import PlatinumTier from "@/assets/symbols/tiers/tier-platinum.svg?react";
import DiamondTier from "@/assets/symbols/tiers/tier-diamond.svg?react";
import RubyTier from "@/assets/symbols/tiers/tier-ruby.svg?react";
import { getTierByRating } from "@/app/types/tier";

interface TierBadgeProps {
  rating: number;
  className?: string;
}
export const TierBadge: React.FC<TierBadgeProps> = ({ rating, className }) => {
  const getTierIcon = () => {
    const tier = getTierByRating(rating);

    switch (tier) {
      case "Bronze":
        return <BronzeTier />;
      case "Silver":
        return <SilverTier />;
      case "Gold":
        return <GoldTier />;
      case "Platinum":
        return <PlatinumTier />;
      case "Diamond":
        return <DiamondTier />;
      case "Ruby":
        return <RubyTier />;
      default:
        return null; // 예외 처리: 해당 티어가 없을 경우 null 반환
    }
  };
  return (
    <div
      className={`${className} w-[50px] h-[50px] rounded-md bg-white flex items-center justify-center`}
    >
      {getTierIcon()}
    </div>
  );
};
