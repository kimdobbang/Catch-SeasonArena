import { useNavigate } from "react-router-dom";
import { Copyright } from "@ui/index";
import { ServiceTitle } from "@ui/index";
export const NotPwaPage = () => {
  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/main");
  };
  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-around h-screen bg-catch-sub-100">
      <div className="flex flex-col items-center">
        <ServiceTitle />
      </div>
      <div className="text-center font-pretendard text-title">PWA설치안내</div>
      <div>모바일 환경에서 아이폰: 홈화면 추가</div>
      <div>
        <button onClick={goToMain} className="bg-catch-main-400">
          Main으로
        </button>
      </div>
      <div>
        <button onClick={goToLogin} className="bg-catch-tier-silver">
          로그인으로
        </button>
      </div>

      <Copyright />
    </div>
  );
};
