import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

export const InGameStats = () => {
  const { stats } = useSelector((state: RootState) => state.user);

  const currentStats = stats;

  return (
    <div className="flex-col space-y-2">
      {/* 체력 */}
      <div className="flex items-center">
        <div className="w-20 text-sm text-gray-600">체력</div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mx-2">
          <div
            className="bg-catch-main-400 h-2.5 rounded-full"
            style={{ width: `${(currentStats.hp / 200) * 100}%` }}
          />
        </div>
        <p className="w-8 text-right">{currentStats.hp}</p>
      </div>

      {/* 사거리 */}
      <div className="flex items-center">
        <div className="w-20 text-sm text-gray-600">사거리</div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mx-2">
          <div
            className="bg-catch-main-400 h-2.5 rounded-full"
            style={{ width: `${(currentStats.coverage / 20) * 100}%` }}
          />
        </div>
        <p className="w-8 text-right">{currentStats.coverage}</p>
      </div>

      {/* 속도 */}
      <div className="flex items-center">
        <div className="w-20 text-sm text-gray-600">속도</div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mx-2">
          <div
            className="bg-catch-main-400 h-2.5 rounded-full"
            style={{ width: `${(currentStats.speed / 20) * 100}%` }}
          />
        </div>
        <p className="w-8 text-right">{currentStats.speed}</p>
      </div>
    </div>
  );
};
