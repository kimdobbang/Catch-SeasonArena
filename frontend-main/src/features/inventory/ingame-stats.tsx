// import { useSelector } from "react-redux";
// import { RootState } from "@/app/redux/store";

export const InGameStats = () => {
  // const { stats } = useSelector((state: RootState) => state.user);

  // const currentStats = stats;

  return (
    <div className="flex-col mb-3">
      <div className="flex items-center">
        <div className="text-sm text-gray-600 w-14">체력</div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-catch-main-400 h-2.5 rounded-full"
            // style={{ width: `${(currentStats.hp / 200) * 100}%` }}
          />
        </div>
        {/* <p className="w-8 text-right">{currentStats.hp}</p> */}
      </div>

      <div className="flex items-center">
        <div className="text-sm text-gray-600 w-14">사거리</div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-catch-main-400 h-2.5 rounded-full"
            // style={{ width: `${(currentStats.coverage / 20) * 100}%` }}
          />
        </div>
        {/* <p className="w-8 text-right">{currentStats.coverage}</p> */}
      </div>

      <div className="flex items-center">
        <div className="text-sm text-gray-600 w-14">속도</div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-catch-main-400 h-2.5 rounded-full"
            // style={{ width: `${(currentStats.speed / 20) * 100}%` }}
          />
        </div>
        {/* <p className="w-8 text-right">{currentStats.speed}</p> */}
      </div>
    </div>
  );
};
