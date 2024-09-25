import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SplashPage } from "./splash-page";

export const RootPage = () => {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // 2초 동안 스플래시 페이지를 보여줌
    const timer = setTimeout(() => {
      setShowSplash(false);

      // PWA 접속 여부 체크
      const isPWA =
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true;

      // 모바일 여부 확인
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isMobile = /mobile|android|iphone|ipad/.test(userAgent);

      if (!isPWA || !isMobile) {
        if (!isPWA) console.log("PWA가 아닙니다");
        if (!isMobile) console.log("모바일이 아닙니다");

        // 데스크탑 접속 시 또는 PWA 아닐시, /pwa 로 이동
        navigate("/pwa");
      } else {
        // PWA로 접속 시 /login 으로 이동
        navigate("/login");
      }
    }, 3000); // 3초 지연

    // 컴포넌트가 언마운트될 때 타이머를 정리하여 메모리 누수 방지
    return () => clearTimeout(timer);
  }, [navigate]);

  if (showSplash) {
    return <SplashPage />;
  }

  return <div className="w-full h-full">Loading...</div>;
};
