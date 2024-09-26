import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { getTierByRating } from "@/app/types/tier";
import { InGameStats } from "@entities/index"; // InGameStats 컴포넌트 가져오기

export const InventoryUserInfo = () => {
  // Redux 상태에서 유저 정보 가져오기
  const { selectedAvatar, rating } = useSelector(
    (state: RootState) => state.user,
  );

  // 유저의 티어 계산
  const userTier = getTierByRating(rating);

  return (
    <div className="flex items-center justify-around h-[40%]">
      {/* 아바타 */}
      <div className="w-10">
        <div>선택아바타: {selectedAvatar}</div>
      </div>

      <div className="w-full ml-9">
        {/* 유저 티어 정보 */}
        <div className="mb-4 text-lg text-gray-700 font-pretendard">
          티어 뱃지
        </div>
        <div className="flex items-center mb-4">
          <div className={`text-xl font-semibold text-catch-tier-${userTier}`}>
            {userTier}
          </div>
        </div>

        {/* Redux로부터 상태를 직접 가져오는 InGameStats */}
        <InGameStats />
      </div>
    </div>
  );
};
