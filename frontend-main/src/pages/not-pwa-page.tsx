import { PrimaryButton } from "@/shared/components/atoms/buttons/PrimaryButton";

export const NotPwaPage = () => {
  const goToGame = () => {
    window.location.href = "/game";
  };
  return (
    <div>
      <h1 className="font-pretendard text-3xl font-bold bg-catch-tier-bronze">
        PWA 설치 요청 페이지입니다.
      </h1>
      <button onClick={goToGame} className="bg-catch-main-400">
        버튼 클릭시 GAME으로 이동합니다
      </button>
      <PrimaryButton color="main" size="small">
        수집하기
      </PrimaryButton>
      <PrimaryButton color="sub" size="big">
        배낭보러가기
      </PrimaryButton>
    </div>
  );
};
