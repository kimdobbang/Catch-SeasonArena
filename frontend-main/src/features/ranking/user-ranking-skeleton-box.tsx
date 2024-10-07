export const UserRankingSkeletonBox = () => {
  return (
    <div className="flex flex-row items-center bg-catch-sub-300 rounded-lg w-[90%] h-[45px] animate-pulse">
      <div className="w-[25%] flex flex-row gap-2 items-center justify-center">
        {/* TierInitial Placeholder */}
        <div className="h-[20px] w-[20px] bg-catch-sub-200 rounded-full" />
        {/* Profile Placeholder */}
        <div className="h-[29px] w-[29px] bg-catch-sub-200 rounded-full" />
      </div>
      <div className="w-[45%]">
        {/* Nickname Placeholder */}
        <div className="h-[20px] w-[80%] bg-catch-sub-200 rounded-md" />
      </div>
      <div className="w-[25%] flex flex-row items-center justify-center">
        {/* Rating and Rank Placeholder */}
        <div className="h-[20px] w-[20px] bg-catch-sub-200 rounded-md mr-2" />
        <div className="h-[20px] w-[20px] bg-catch-sub-200 rounded-md mr-2" />
        <div className="h-[20px] w-[30px] bg-catch-sub-200 rounded-md" />
      </div>
    </div>
  );
};
