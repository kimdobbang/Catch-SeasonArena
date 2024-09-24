import { useNavigate } from "react-router-dom";
import { Copyright } from "@ui/index";
import { Leave } from "@atoms/index";
import ServiceTitle from "@/assets/symbols/service-title.svg?react";

export const NotPwaPage = () => {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };

  const goToGame = () => {
    window.location.href = "/game";
  };

  return (
    <div className="flex flex-col items-center justify-around h-screen bg-catch-sub-100">
      <div className="flex flex-col items-center">
        <Leave color="text-catch-sub-400" />
        <ServiceTitle />
      </div>
      <div className="text-center font-pretendard text-title">
        여기는 PWA설치안내 페이지
      </div>
      <div>
        웹, 모바일 웹으로 접속하면 실행이 안대 설치하도록 알려주어야하는 페이지
      </div>
      <div>
        <button onClick={goToGame} className="bg-catch-main-400">
          버튼 클릭시 GAME으로 이동합니다
        </button>
      </div>
      <div>
        <button onClick={goToLogin} className="bg-catch-tier-dia">
          버튼 클릭시 로그인으로 이동합니다
        </button>
      </div>
      {/* <PrimaryButton color="main" size="small">
        수집하기
      </PrimaryButton>
      <PrimaryButton color="sub" size="big">
        배낭보러가기
      </PrimaryButton> */}
      <Copyright />
    </div>
  );
};
