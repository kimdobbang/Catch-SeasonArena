export const InventoryUserInfo = () => {
  return (
    <div className="flex items-center justify-around h-[40%]">
      <div className="font-pretendard text-sub2">유저아바타</div>
      <div className="ml-9">
        <div className="font-pretendard text-sub2">유저정보</div>
        <div className="flex">
          <div>티어 뱃지</div>
          <div>티어 text</div>
        </div>
        <div className="flex-col">
          <div className="font-pretendard text-sub2">인게임 스탯</div>
          <div>체력 스탯 기본100 스탯</div>
          <div>공격력 스탯 기본10</div>
          <div>속도 스탯 기본10</div>
        </div>
      </div>
    </div>
  );
};
