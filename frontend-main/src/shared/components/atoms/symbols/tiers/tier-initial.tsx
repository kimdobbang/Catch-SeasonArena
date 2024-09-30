import { getTierByRating } from "@/app/types/tier";

interface TierInitialProps {
  rating: number; // 레이팅
  size: "small" | "big"; // 모양 동일, 크기만 다름
  className?: string; // 추가 속성
}

export const TierInitial: React.FC<TierInitialProps> = ({
  rating,
  size,
  className = "",
}) => {
  const tier = getTierByRating(rating);

  const getAlphabet = () => {
    if (!tier) return null;
    return tier[0];
  };

  const getSize = () => {
    if (size === "big") {
      return "h-[27px] w-[27px] text-body2 rounded-md";
    } else {
      return "h-[20px] w-[20px] text-caption1 rounded-xs";
    }
  };

  const getBackgroundClass = () => {
    switch (tier) {
      case "Bronze":
        return "bg-catch-tier-Bronze";
      case "Silver":
        return "bg-catch-tier-Silver";
      case "Gold":
        return "bg-catch-tier-Gold";
      case "Platinum":
        return "bg-catch-tier-Platinum";
      case "Diamond":
        return "bg-catch-tier-Diamond";
      case "Ruby":
        return "bg-catch-tier-Ruby";
      default:
        return "bg-catch-tier-Silver"; // 기본값
    }
  };

  return (
    <div
      className={`${getSize()} ${getBackgroundClass()} shrink-0 text-center flex justify-center text-white items-center ${className}`}
    >
      {getAlphabet()}
    </div>
  );
};
