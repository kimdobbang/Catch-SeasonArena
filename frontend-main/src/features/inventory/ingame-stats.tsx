import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

export const InGameStats = () => {
  const { equipment } = useSelector((state: RootState) => state.user);

  // 장착된 아이템에 따라 체력, 사거리, 속도를 계산하는 함수
  const calculateStats = () => {
    let hp = 100;
    let coverage = 10;
    let speed = 10;

    if (equipment.weapon.itemId === 1) {
      coverage *= 1.3;
    }

    if (equipment.passive) {
      switch (equipment.passive.itemId) {
        case 6:
          hp *= 2;
          break;
        case 10:
          speed *= 1.3;
          break;
      }
    }

    return { hp, coverage, speed };
  };

  // 현재 스탯 계산
  const currentStats = calculateStats();

  return (
    <div className="flex-col mb-3 mr-2">
      <div className="flex items-center">
        <div className="text-sm text-gray-600 w-14">체력</div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-catch-main-400 h-2.5 rounded-full"
            style={{ width: `${(currentStats.hp / 200) * 100}%` }}
          />
        </div>
        <p className="w-8 text-right">{currentStats.hp}</p>
      </div>

      <div className="flex items-center">
        <div className="text-sm text-gray-600 w-14">사거리</div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-catch-main-400 h-2.5 rounded-full"
            style={{ width: `${(currentStats.coverage / 20) * 100}%` }}
          />
        </div>
        <p className="w-8 text-right">{currentStats.coverage}</p>
      </div>

      <div className="flex items-center">
        <div className="text-sm text-gray-600 w-14">속도</div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
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
