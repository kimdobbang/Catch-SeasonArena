//정규표현식 패턴이나 공통함수 등 공통으로 사용하는 유틸 파일들이 위치

export const getDurability = (grade: string) => {
  if (grade === "normal") return 5;
  else if (grade === "rare") return 10;
  else if (grade === "legend") return 15;
  else return 5;
};

// 분:초로 시간 변환 함수
export const formatTime = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes}: ${seconds}`;
};
