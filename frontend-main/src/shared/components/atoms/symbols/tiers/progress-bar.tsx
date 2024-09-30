import { tierRanges, getTierByRating } from "@/app/types/tier";

interface ProgressProps {
  rating: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressProps> = ({ rating, className }) => {
  const tier = getTierByRating(rating);
  const min = tierRanges[tier].min;
  const max = tierRanges[tier].max;

  // tier에 따라 색상을 설정
  const getGradientColor = () => {
    switch (tier) {
      case "Bronze":
        return "linear-gradient(to right, #f6f6f6, #9D4900)";
      case "Silver":
        return "linear-gradient(to right, #f6f6f6, #C0C0C0)";
      case "Gold":
        return "linear-gradient(to right, #f6f6f6, #FFB028)";
      case "Platinum":
        return "linear-gradient(to right, #f6f6f6, #27E2A4)";
      case "Diamond":
        return "linear-gradient(to right, #f6f6f6, #41CAFF)";
      case "Ruby":
        return "linear-gradient(to right, #f6f6f6, #F5005A)";
      default:
        return "linear-gradient(to right, #f6f6f6, #C0C0C0)"; // 기본 색상
    }
  };

  // 비율 계산
  const getValue = () => {
    // 현재 레이팅이 해당 티어의 최소값과 최대값 사이에서 몇 퍼센트인지 계산
    return ((rating - min) / (max - min)) * 100;
  };

  return (
    <div className="w-full h-8 overflow-hidden bg-gray-300 rounded-lg">
      <div
        className={`${className} h-8 text-sm font-semibold text-center flex items-center justify-center text-white`}
        style={{
          width: `${getValue()}%`, // 진행률을 백분율로 설정
          backgroundImage: getGradientColor(), // 티어에 따른 색상 적용
        }}
      >
        {rating} Points {/* 진행률 바 위에 현재 rating 값 표시 */}
      </div>
    </div>
  );
};
