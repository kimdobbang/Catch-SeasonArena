import { Login } from "@/features/auth/login";

export const LoginPage = () => {
  const goToGame = () => {
    window.location.href = "/game";
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
