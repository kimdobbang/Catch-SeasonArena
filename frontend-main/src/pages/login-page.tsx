import { Login } from "@/features/auth/login";
import { useNavigate } from "react-router-dom";
export const LoginPage = () => {
  const navigate = useNavigate();
  const goToGame = () => {
    window.location.href = "/game";
  };
  const goToMain = () => {
    window.location.href = "/main";
  };
  const goMain = () => {
    navigate("/main");
  };
  return (
    <div>
      <button onClick={goToGame} className="bg-catch-tier-bronze">
        GAME으로
      </button>
      <button onClick={goToMain} className="bg-catch-tier-ruby">
        메인HREF
      </button>
      <button onClick={goMain} className="bg-catch-tier-platinum">
        메인Navigate
      </button>
      <Login />;
    </div>
  );
};
