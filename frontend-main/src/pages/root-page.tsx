import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OnboardingPage } from "./onboarding-page";

export const RootPage = () => {
  const navigate = useNavigate();
  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    // 3초 동안 온보딩 페이지를 보여줌
    const timer = setTimeout(() => {
      setShowOnboarding(false);

      // 온보딩 후 경로 설정
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isMobile = /mobile|android|iphone|ipad/.test(userAgent);

      if (!isMobile) {
        // 데스크탑 접속 시 모바일 접속 유도 페이지로 이동
        navigate("/desktop-warning");
      } else {
        // 모바일 접속 시 PWA 설치 유도 페이지로 이동
        navigate("/pwa");
      }
    }, 2000); // 3초 지연

    // 컴포넌트가 언마운트될 때 타이머를 정리하여 메모리 누수 방지
    return () => clearTimeout(timer);
  }, [navigate]);

  if (showOnboarding) {
    return <OnboardingPage />;
  }

  return <div className="w-full h-full">Loading...</div>;
};
