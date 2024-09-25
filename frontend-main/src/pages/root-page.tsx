// import config from "@/config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "@/app/redux/slice/authSlice";
import { SplashPage } from "./splash-page";

export const RootPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("0. 로그인 후 리디렉션 성공");
  const fetchTokenFromHeader = async () => {
    try {
      const response = await fetch(window.location.href, {
        method: "POST",
        credentials: "include", //쿠키포함
      });

      console.log("1. response: ", response);

      // Authorization 헤더에서 토큰 추출
      const authorizationHeader = response.headers.get("Authorization");
      console.log("2. authorizationHeader: ", authorizationHeader);

      if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
        const accessToken = authorizationHeader.replace("Bearer ", "");

        // 토큰을 로컬 스토리지에 저장
        localStorage.setItem("token", accessToken);
        console.log("3. OAuth 로그인 성공, 토큰 저장 완:", accessToken);
        dispatch(setAuth({ accessToken }));
        navigate("/main");
      } else {
        throw new Error("Authorization 헤더에 유효한 토큰이 없습니다.");
      }
    } catch (error) {
      console.error("OAuth 로그인 실패:", error);
      navigate("/login");
    }
  };
  useEffect(() => {
    fetchTokenFromHeader();
  }, [dispatch, navigate]);

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
