import React, { useState } from "react";
import { CollectionbookItem } from "@/app/apis/collectionbook-api";

// 모달 컴포넌트 생성
export const CollectionbookItemCard = ({
  item,
  onClose,
}: {
  item: CollectionbookItem;
  onClose: () => void;
}) => {
  const [isFlipped, setIsFlipped] = useState(false); // 앞면/뒷면 상태 관리

  if (!item) return null;

  const handleOutsideClick = () => {
    onClose();
  };

  const handleInsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // 모달 내부 클릭 시 모달이 닫히지 않게 방지
  };

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped); // 카드 클릭 시 앞뒤면 전환
  };

  // 등급별 배경 및 배지 색상 설정
  const gradeStyles: {
    [key: string]: {
      bgGradient: string;
      badgeColor: string;
      gradeName: string;
    };
  } = {
    normal: {
      bgGradient: "from-[#e0e0e0] to-[#f0f0f0]",
      badgeColor: "bg-catch-tier-Silver",
      gradeName: "일반",
    },
    rare: {
      bgGradient: "from-[#ffe6a7] to-[#ffd37b]",
      badgeColor: "bg-catch-tier-Gold",
      gradeName: "레어",
    },
    legend: {
      bgGradient: "from-[#a7e6ff] to-[#41caff]",
      badgeColor: "bg-catch-tier-Diamond",
      gradeName: "전설",
    },
  };

  // 등급에 따른 스타일 적용
  const grade = item.item.grade.toLowerCase();
  const { bgGradient, badgeColor, gradeName } =
    gradeStyles[grade] || gradeStyles["normal"];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOutsideClick}
    >
      <div
        className={`relative w-[240px] rounded-lg h-[320px] bg-gradient-to-b ${bgGradient}`}
        onClick={handleInsideClick}
      >
        <div
          className="flex items-center justify-center w-full h-full"
          onClick={handleCardFlip} // 카드 클릭 시 앞뒤면 전환
        >
          {!isFlipped ? (
            // 앞면
            <div className="p-6 text-center">
              {/* ID, 등급 배지, 아이템 이름 */}
              <div className="flex items-center justify-between mb-6">
                {/* ID와 아이템 이름 그룹 */}
                <div className="flex items-center">
                  {/* ID 뱃지 */}
                  <div className="flex items-center justify-center w-6 h-6 font-bold rounded-full text-catch-gray-000 text-caption1 bg-catch-sub-400">
                    {item.item.id}
                  </div>

                  {/* 아이템 이름 */}
                  <h2 className="ml-2 font-bold text-body2 text-catch-gray-999">
                    {item.item.name}
                  </h2>
                </div>

                {/* 등급 배지 */}
                <div
                  className={`px-4 py-1 font-medium text-caption1 text-catch-gray-000 rounded-full ${badgeColor}`}
                >
                  {gradeName}
                </div>
              </div>

              {/* 아이템 이미지 */}
              <img
                src={item.item.image}
                alt={item.item.name}
                className="object-contain w-3/4 mx-auto mb-4 h-3/4" // object-contain으로 수정
              />

              {/* 수집 정보 */}
              <div className="mt-2 text-center">
                <p className="font-bold text-body2 text-catch-gray-999">
                  {item.count}회 수집
                </p>
                <p className="font-medium text-caption1 text-catch-gray-400">
                  Since {item.createdAt}
                </p>
              </div>
            </div>
          ) : (
            // 뒷면
            <div className="relative flex items-center justify-center w-full h-full">
              <div className="absolute inset-0 bg-black rounded-lg bg-opacity-30"></div>
              <img
                src={item.item.image} // 앞면 이미지와 동일한 이미지 사용
                alt="뒷면 이미지"
                className="object-contain w-3/5 mx-auto h-3/5 filter blur-md" // object-contain으로 수정하여 좌우 잘림 해결
              />
              <div className="absolute inset-0 flex items-center justify-center p-6 font-bold text-center text-catch-gray-000 text-body1">
                <p
                  style={{
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                  className="p-2"
                >
                  {item.item.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
