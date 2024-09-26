import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { getTierByRating } from "@/app/types/tier";
import { InGameStats } from "@entities/index"; // InGameStats 컴포넌트 가져오기

export const InventoryUserInfo = () => {
  // Redux 상태에서 유저 정보 가져오기
  const { selectedAvatar, rating } = useSelector(
    (state: RootState) => state.user,
  );

  const userTier = getTierByRating(rating);

  return (
    <div className="flex items-center h-[40%]">
      <div className="w-[30%]">
        <div>선택아바타: {selectedAvatar}</div>
      </div>

      <div className="w-full ml-9">
        <div className="mb-4 text-lg text-gray-700 font-pretendard">
          티어뱃지
        </div>
        <div className={`text-xl font-semibold text-catch-tier-${userTier}`}>
          {userTier}
        </div>
        <InGameStats />
      </div>
    </div>
  );
};
