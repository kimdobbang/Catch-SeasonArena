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
        return "linear-gradient(to right, #9D4900, #C0C0C0)";
      case "Silver":
        return "linear-gradient(to right, #C0C0C0, #FFB028)";
      case "Gold":
        return "linear-gradient(to right, #FFB028, #27E2A4)";
      case "Platinum":
        return "linear-gradient(to right, #27E2A4, #41CAFF)";
      case "Diamond":
        return "linear-gradient(to right, #41CAFF, #F5005A)";
      case "Ruby":
        return "linear-gradient(to right, #F5005A, #F5005A)";
      default:
        return "linear-gradient(to right, #f6f6f6, #C0C0C0)"; // 기본 색상
    }
  };

  // 비율 계산
  const getValue = () => {
    return ((rating - min) / (max - min)) * 100;
  };

  return (
    <div className="relative w-full">
      {/* Progress bar wrapper */}
      <div className="relative w-full h-8 overflow-hidden bg-gray-300 rounded-lg">
        {/* Progress bar itself */}
        <div
          className={`${className} h-8 flex items-center justify-center text-white`}
          style={{
            width: `${getValue()}%`, // 진행률을 백분율로 설정
            backgroundImage: getGradientColor(), // 티어에 따른 색상 적용
          }}
        >
          {/* 진행 바 위에는 텍스트 없음 */}
        </div>
      </div>

      {/* Rating 텍스트, 진행된 만큼 바로 아래에 위치 */}
      <div
        className="absolute text-sm font-semibold text-gray-700"
        style={{
          left: `${getValue()}%`, // 진행된 만큼의 위치에 고정
          transform: "translateX(-50%)", // 텍스트 중앙 정렬
          top: "40px", // 진행 바 아래에 위치시키기 위해 top 조정
        }}
      >
        {rating} Points
      </div>
    </div>
  );
};