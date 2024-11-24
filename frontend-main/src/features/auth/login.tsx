// /src/feature/auth/login.tsx
import config from "@/config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "@/app/apis/authApi";
import { handleLoginSuccess } from "@/shared/utils/fetch-user-info";
import { ServiceTitle } from "@ui/index";
import { Copyright } from "@widgets/index";
import {
  InputField,
  IconTextButton,
  DefaultLoginButton,
  KakaoLoginButton,
  GoogleLoginButton,
  Leave,
} from "@atoms/index";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const goSignUp = () => {
    navigate("/signup");
  };

  const handleOAuthLogin = (provider: "kakao" | "google") => {
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
        await handleLoginSuccess(accessToken, dispatch, navigate);
      }
    } catch (error) {
      setErrorMessage("입력 정보를 확인 바랍니다😅");
      console.error("get userInfo 실패:", error);
    }
  };

  return (
    <div className="flex flex-col justify-around h-screen bg-catch-sub-100">
      <ServiceTitle />
      <div className="flex flex-col w-full max-w-xs mx-auto space-y-4">
        <InputField
          label="ID"
          placeholder="아이디를 입력해주세요"
          type="id"
          value={email}
          onChange={setEmail}
        />
        <InputField
          label="Password"
          placeholder="비밀번호를 입력해주세요"
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
