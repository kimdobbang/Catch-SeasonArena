// /src/pages/oauth-callback-page.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "@/app/redux/slice/authSlice";
import { fetchUserInfo } from "@/app/apis/authApi";

export const OAuthCallbackPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchTokenFromUrl = async () => {
    const pathSegments = location.pathname.split("/");
    const accessToken = pathSegments[pathSegments.length - 1];

    if (accessToken) {
      console.log("OAuth 로그인 성공, 토큰 저장 완료:", accessToken);
      dispatch(setToken(accessToken));

      const userInfo = await fetchUserInfo(accessToken);
      dispatch(setUser({ email: userInfo.email, nickName: userInfo.nickName }));
      navigate("/main");
    } else {
      setErrorMessage("OAuth 로그인 실패: URL에 유효한 토큰이 없습니다.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokenFromUrl();
  }, [dispatch, navigate]);

  if (loading) {
    return <div>로그인 처리 중...</div>;
  }

  if (errorMessage) {
    return <div className="error-message">{errorMessage}</div>;
  }

  return null;
};
