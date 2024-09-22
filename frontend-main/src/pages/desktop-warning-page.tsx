import { useNavigate } from "react-router-dom";
export const DesktopWarningPage = () => {
  const navigate = useNavigate();

  const goToGame = () => {
    window.location.href = "/game";
  };
  const goToLogin = () => {
    navigate("/login");
  };
  const goToPWA = () => {
    navigate("/pwa");
  };
  return (
    <div>
      Desktop Warning Page
      <br /> 모바일로 접속해주세요
      <div>
        <button onClick={goToGame} className="bg-catch-main-400">
          게임 이동 버튼
        </button>
      </div>
      <div>
        <button onClick={goToLogin} className="bg-catch-tier-dia">
          로그인으로 이동 버튼
        </button>
      </div>
      <div>
        <button onClick={goToPWA} className="bg-catch-tier-ruby">
          PWA 페이지로 이동 버튼
        </button>
      </div>
    </div>
  );
};
