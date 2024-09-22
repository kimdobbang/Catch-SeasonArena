import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const RootPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isMobile = /mobile|android|iphone|ipad/.test(userAgent);

    if (!isMobile) {
      // 데스크탑 접속 시 모바일 접속 유도 페이지로 이동
      navigate("/desktop-warning");
    } else {
      // 모바일 접속 시 PWA 설치 유도 페이지로 이동
      navigate("/pwa");
    }
  }, [navigate]);

  return <div className="w-full h-full">Loading...</div>;
};
