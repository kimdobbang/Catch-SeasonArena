import { useEffect, useState, useRef } from "react";
import { MyRankingBox } from "./my-ranking-box";
import { UserRankingBox } from "./user-ranking-box";
import { fetchTierRankings, RankingProps } from "@/app/apis/rankingApi"; // 방금 만든 api 호출 함수 가져오기
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import { UserRankingSkeletonBox } from "./user-ranking-skeleton-box";

export const TierRankingTab = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [rankings, setRankings] = useState<RankingProps[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // 더 가져올 데이터가 있는지 확인하는 상태
  const observerRef = useRef(null); // IntersectionObserver를 위한 ref

  useEffect(() => {
    const loadRankings = async () => {
      setLoading(true);
      const newRankings = await fetchTierRankings(page, accessToken);
      if (newRankings.length > 0) {
        setRankings((prevRankings) => [...prevRankings, ...newRankings]); // 이전 데이터에 새 데이터 추가
      } else {
        setHasMore(false); // 더 이상 불러올 데이터가 없으면 중단
      }
      setLoading(false);
    };

    if (hasMore) {
      loadRankings(); // 더 불러올 데이터가 있을 때만 호출
    }
  }, [page, hasMore, accessToken]);

  // 무한 스크롤을 위한 IntersectionObserver 설정
  useEffect(() => {
    if (!observerRef.current || !hasMore) return; // 더 불러올 데이터가 없으면 중단

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        setPage((prevPage) => prevPage + 1); // 페이지를 증가시켜 다음 데이터 로딩
      }
    });

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [loading, hasMore]);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col items-center h-[30%] ">
        <MyRankingBox />
        <div className="w-full h-[1px] bg-catch-gray-200 mt-2 mb-2"></div>
      </div>
      {/* 스크롤 가능한 영역 */}
      <div className="h-[85%] flex flex-col items-center flex-grow overflow-y-auto justify-evenly">
        <div className="flex flex-col items-center w-full gap-5 ">
          {rankings.map((ranking, index) => (
            <UserRankingBox
              key={index}
              avatar={ranking.avatar}
              nickname={ranking.nickname}
              rating={ranking.rating}
              rank={ranking.tierRanking}
            />
          ))}

          {/* 로딩 표시 */}
          {loading && <UserRankingSkeletonBox />}
          {/* 이 div에 스크롤이 닿으면 다음 페이지를 로딩 */}
          <div className="w-full h-[20px] bg-red" ref={observerRef} />
        </div>
      </div>
    </div>
  );
};
