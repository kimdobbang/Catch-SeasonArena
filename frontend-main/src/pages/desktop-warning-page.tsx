import { useNavigate } from "react-router-dom";
import { Sleaves } from "@atoms/index";
import ServiceTitle from "@/assets/symbols/service-title.svg?react";

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
    <div className="flex flex-col items-center gap-10 h-screen bg-catch-sub-100">
      <div className="flex flex-col items-center mt-10">
        <ServiceTitle />
        <Sleaves color="text-catch-sub-400" />
        Desktop Warning Page
        <br /> 모바일로 접속해주세요
      </div>
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
          PWA 설치안내 페이지로 이동 버튼
        </button>
      </div>
    </div>
  );
};
