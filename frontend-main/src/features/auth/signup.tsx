// src/features/auth/signup.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField, SignupButton, IconTextButton, Leave } from "@atoms/index";
import { ServiceTitle, Copyright } from "@ui/index";
import { signUpUser, checkEmailExists } from "@/app/apis/authApi";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "@/app/redux/slice/authSlice";

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState<string>("");
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // 이메일 중복 확인 (API 호출)
  const checkEmail = async () => {
    try {
      const exists = await checkEmailExists(email);
      if (exists) {
        setEmailAvailable(true);
        setErrorMessage("사용 가능한 이메일입니다.");
      } else {
        setEmailAvailable(false);
        setErrorMessage("이미 사용 중인 이메일입니다.");
      }
    } catch (error) {
      setEmailAvailable(false);
      setErrorMessage("이메일 중복 확인 실패");
      console.error("중복 확인 에러:", error);
    }
  };

  // 회원가입 처리
  const handleSignup = async () => {
    if (!email || !password || !checkPassword) {
      setErrorMessage("이메일과 비밀번호를 모두 입력하세요.");
      return;
    }

    if (password !== checkPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const { data, accessToken } = await signUpUser({ email, password });

      // 토큰이 있다면 로컬 스토리지와 Redux에 저장
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        dispatch(setToken(accessToken));
        dispatch(setUser(data)); // 유저 정보 저장
      }

      console.log("회원가입 성공:", data);
      navigate("/main");
    } catch (error) {
      setErrorMessage("회원가입에 실패했습니다.");
      console.error("회원가입 에러:", error);
    }
  };

  return (
    <div className="flex flex-col justify-around h-screen bg-catch-sub-100">
      <ServiceTitle />
      {/* 가입정보 입력 필드 */}
      <div className="flex flex-col w-full max-w-xs mx-auto space-y-6">
        <div className="flex items-center space-x-2">
          <InputField
            label="Email"
            placeholder="youremail@adress.com"
            type="email"
            value={email}
            onChange={setEmail}
          />
          <IconTextButton label="중복 확인" onClick={checkEmail} />
        </div>
        {emailAvailable === true && (
          <div className="text-green-500">사용 가능한 이메일입니다.</div>
        )}
        {emailAvailable === false && (
          <div className="text-red-500">이미 사용 중인 이메일입니다.</div>
        )}
        <InputField
          label="Password"
          placeholder="Password 8자 이상"
          type="password"
          value={password}
          onChange={setPassword}
        />
        <InputField
          label="Password 확인"
          placeholder="비밀번호를 확인 해주세요"
          type="password"
          value={checkPassword}
          onChange={setCheckPassword}
        />
        {errorMessage && (
          <div className="mt-2 text-center text-red-500">{errorMessage}</div>
        )}
      </div>

      {/* 회원가입 버튼 */}
      <div className="flex justify-center mb-4">
        <SignupButton
          onClick={handleSignup}
          logo={<Leave color="text-catch-sub-200" />}
          bgColor="bg-catch-sub-400"
          text="회원가입"
          textColor="text-white"
        />
      </div>

      <Copyright />
    </div>
  );
};
