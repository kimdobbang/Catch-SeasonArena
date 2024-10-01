// import config from "@/config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SplashPage } from "@/pages/index";

export const RootPage = () => {
  const navigate = useNavigate();

  // SplashPage 처리
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);

      const isPWA =
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone === true;

      const userAgent = window.navigator.userAgent.toLowerCase();
      const isMobile = /mobile|android|iphone|ipad/.test(userAgent);

      if (!isPWA || !isMobile) {
        if (!isPWA) console.log("PWA가 아닙니다");
        if (!isMobile) console.log("모바일이 아닙니다");

        navigate("/login");
      } else {
        navigate("/login");
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  if (showSplash) {
    return <SplashPage />;
  }

  return <div className="w-full h-full">Loading...</div>;
};
