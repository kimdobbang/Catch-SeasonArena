// /src/feature/auth/login.tsx
import config from "@/config";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser, fetchUserInfo } from "@/app/apis/authApi";
import { setToken, setUser } from "@/app/redux/slice/authSlice";
import { ServiceTitle, Copyright } from "@ui/index";
import {
  InputField,
  IconTextButton,
  DefaultLoginButton,
  KakaoLoginButton,
  GoogleLoginButton,
  Leave,
} from "@atoms/index";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const goSignUp = () => {
    navigate("/signup");
  };

  const handleOAuthLogin = (provider: "kakao" | "google") => {
    window.localStorage.setItem("provider", provider);
    window.location.href = `${config.API_BASE_URL}/api/auth/oauth2/authorization/${provider}`;
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("로그인 정보를 입력하세요.");
      return;
    }

    try {
      const { accessToken } = await loginUser({ email, password });

      if (accessToken) {
        dispatch(setToken(accessToken));

        const userInfo = await fetchUserInfo(accessToken);
        dispatch(
          setUser({ email: userInfo.email, nickName: userInfo.nickName }),
        );

        navigate("/main");
      }
    } catch (error) {
      setErrorMessage("입력 정보를 확인 바랍니다 ㅜ.ㅜ");
      console.error("로그인 에러:", error);
    }
  };

  return (
    <div className="flex flex-col justify-around h-screen bg-catch-sub-100">
      <ServiceTitle />
      <div className="flex flex-col w-full max-w-xs mx-auto space-y-4">
        <InputField
          label="Email"
          placeholder="youremail@adress.com"
          type="email"
          value={email}
          onChange={setEmail}
        />
        <InputField
          label="Password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={setPassword}
        />
        <div className="flex justify-end">
          <div>
            {errorMessage && (
              <div className="flex text-catch-main-400">{errorMessage}</div>
            )}
          </div>
          <div className="flex items-end ml-2">
            <IconTextButton
              label="회원가입"
              Icon={<Leave width="1rem" />}
              onClick={goSignUp}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center w-full max-w-xs mx-auto space-y-4">
        <DefaultLoginButton onClick={handleLogin} />
        <KakaoLoginButton onClick={() => handleOAuthLogin("kakao")} />
        <GoogleLoginButton onClick={() => handleOAuthLogin("google")} />
      </div>
      <Copyright />
    </div>
  );
};
