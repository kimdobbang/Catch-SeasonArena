import { useNavigate } from "react-router-dom";

export const NotPwaPage = () => {
  const navigate = useNavigate();

  const goToGame = () => {
    navigate("/game"); // Navigate to the /game route
  };
  return (
    <div>
      <h1 className="font-pretendard text-3xl font-bold bg-catch-tier-bronze">
        PWA 설치 요청 페이지입니다.
      </h1>
      <button onClick={goToGame} className="bg-catch-main-400">
        버튼 클릭시 GAME으로 이동합니다
      </button>
    </div>
  );
};
