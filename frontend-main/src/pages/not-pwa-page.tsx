import { useNavigate } from "react-router-dom";
import { Copyright } from "@ui/index";
import { ServiceTitle } from "@ui/index";
export const NotPwaPage = () => {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };

  const goToRanking = () => {
    navigate("/ranking");
  };
  const goToInventory = () => {
    navigate("/inventory");
  };
  const goToAvartar = () => {
    navigate("/avartar");
  };

  const goToGame = () => {
    window.location.href = "/game";
  };

  return (
    <div className="flex flex-col items-center justify-around h-screen bg-catch-sub-100">
      <div className="flex flex-col items-center">
        <ServiceTitle />
      </div>
      <div className="text-center font-pretendard text-title">
        여기는 PWA설치안내 페이지
      </div>
      <div>
        웹, 모바일 웹으로 접속하면 실행이 안대 설치하도록 알려주어야하는 페이지
      </div>
      <div>
        <button onClick={goToGame} className="bg-catch-tier-bronze">
          GAME으로
        </button>
      </div>
      <div>
        <button onClick={goToLogin} className="bg-catch-tier-silver">
          로그인으로
        </button>
      </div>
      <div>
        <button onClick={goToInventory} className="bg-catch-tier-ruby">
          인벤토리
        </button>
      </div>
      <div>
        <button onClick={goToRanking} className="bg-catch-tier-dia">
          랭킹
        </button>
      </div>
      <div>
        <button onClick={goToAvartar} className="bg-catch-tier-bronze">
          아바타
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
