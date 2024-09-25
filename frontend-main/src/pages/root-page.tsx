import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/redux/userSlice";

import { SplashPage } from "./splash-page";

export const RootPage = () => {
  // OAuthCallback
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    // 리디렉션된 후 엑세스 토큰을 헤더에서 가져오기
    const fetchTokenFromHeader = async () => {
      try {
        const response = await fetch(window.location.href, {
          method: "GET",
          credentials: "include", // 쿠키를 포함한 요청
        });

        const accessToken = response.headers.get("Authorization");
        if (accessToken) {
          // 로그인 성공시
          const token = accessToken.replace("Bearer ", "");
          localStorage.setItem("authToken", token);
          console.log("OAuth 로그인 성공, 엑세스 토큰:", token);
          // 사용자 정보를 Redux에 저장
          const email = "user@example.com"; // 실제로 서버에서 이메일 정보를 받아와 사용(토큰 디코딩하면 이메일됨)
          dispatch(setUser({ token, email }));
          navigate("/main");
        } else {
          throw new Error("Authorization 헤더에 토큰이 없습니다.");
        }
      } catch (error) {
        console.error("OAuth 로그인 실패:", error);
        navigate("/login");
      }
    };
    // 로그인 시도 후 OAuthCallback URL로 root에 redirect된 경우 fetchTokenFromHeader 호출
    fetchTokenFromHeader();
  }, [dispatch, navigate]);

  // SplashPage
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
        navigate("/pwa");
      }
    }, 1500); // 1.5초 지연

    // 컴포넌트가 언마운트될 때 타이머를 정리하여 메모리 누수 방지
    return () => clearTimeout(timer);
  }, [navigate]);

  if (showSplash) {
    return <SplashPage />;
  }

  return <div className="w-full h-full">Loading...</div>;
};
