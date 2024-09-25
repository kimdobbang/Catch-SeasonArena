import { Login } from "@/features/auth/login";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();

  const goToGame = () => {
    navigate("/game");
  };
  return (
    <div>
      <button onClick={goToGame} className="bg-catch-tier-bronze">
        GAME으로
      </button>
      <Login />;
    </div>
  );
};
