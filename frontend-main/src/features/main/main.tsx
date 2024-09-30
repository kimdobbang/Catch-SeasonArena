import { TierBig, TierSmall } from "@/shared/components/atoms";
import { TierProgressBar } from "@/shared/components/entities";

export const Main = () => {
  // main 페이지에서 토큰 확인 및 로그인 상태 체크 예시
  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //   if (!token) {
  //     navigate("/login"); // 토큰이 없으면 로그인 페이지로 리디렉션
  //   }
  // }, [navigate]);
  return (
    <div className="w-full h-full ">
      메인 컴포넌트
      <TierProgressBar rating={400} />
      <TierBig rating={2000} />
      <TierSmall rating={400} size="big" />
      <TierSmall rating={1501} size="small" />
      <TierSmall rating={2501} size="big" className="bg-red-500" />
    </div>
  );
};
