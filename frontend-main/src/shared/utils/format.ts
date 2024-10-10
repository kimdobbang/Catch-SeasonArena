//정규표현식 패턴이나 공통함수 등 공통으로 사용하는 유틸 파일들이 위치

export const getDurability = (grade: string) => {
  if (grade === "normal") return 5;
  else if (grade === "rare") return 10;
  else if (grade === "legend") return 15;
  else return 5;
};

// 분:초로 시간 변환 함수
export const formatTime = (timeInSeconds: string | number) => {
  const time =
    typeof timeInSeconds === "string"
      ? parseInt(timeInSeconds, 10)
      : timeInSeconds;

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return `${minutes}분 ${seconds}초`;
};
