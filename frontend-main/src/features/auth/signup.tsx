// src/features/auth/signup.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField, SignupButton, IconTextButton, Leave } from "@atoms/index";
import { ServiceTitle } from "@ui/index";
import { Copyright } from "@widgets/index";
import { signUpUser, checkEmailExists } from "@/app/apis/authApi";
import { useDispatch } from "react-redux";
import { handleLoginSuccess } from "@/shared/utils/fetch-user-info";

export const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState<string>("");

  const [emailAvailable, setEmailAvailable] = useState<boolean>(false);
  const [emailerrorMessage, setEmailErrorMessage] = useState<string>("");
  const [signupErrorMessage, setSignupErrorMessage] = useState<string>("");

  const checkEmail = async () => {
    try {
      const exists = await checkEmailExists(email);
      if (exists) {
        setEmailAvailable(true);
        setEmailErrorMessage("반갑습니다");
      } else {
        setEmailAvailable(false);
        setEmailErrorMessage("이미 가입하셨는데요");
      }
    } catch (error) {
      setEmailAvailable(false);
      setEmailErrorMessage("이메일 중복 확인 실패");
      console.error("중복 확인 에러:", error);
    }
  };

  const handleSignup = async () => {
    if (!email || !password || !checkPassword) {
      setSignupErrorMessage("가입정보를 입력해주세요.");
      return;
    }
    if (!emailAvailable) {
      setSignupErrorMessage("아이디 중복 확인을 해주세요.");
      return;
    }

    if (password !== checkPassword) {
      setSignupErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const { data, accessToken } = await signUpUser({ email, password });
      console.log("회원가입 성공", data);

      if (accessToken) {
        await handleLoginSuccess(accessToken, dispatch, navigate);
      }
    } catch (error) {
      setSignupErrorMessage("회원가입에 실패했습니다.");
      console.error("가입 에러:", error);
    }
  };

  return (
    <div className="flex flex-col justify-around h-screen bg-catch-sub-100">
      <ServiceTitle />
      <div className="flex flex-col w-full max-w-xs mx-auto space-y-6">
        <div className="flex items-center space-x-2">
          <InputField
            label="ID"
            placeholder="아이디를 입력해주세요"
            type="ID"
            value={email}
            onChange={setEmail}
          />
          <IconTextButton label="중복 확인" onClick={checkEmail} />
        </div>
        {emailerrorMessage && (
          <div className="mt-0 text-catch-main-400">{emailerrorMessage}</div>
        )}
        <InputField
          label="Password"
          placeholder="비밀번호를 입력해주세요"
          type="password"
          value={password}
          onChange={setPassword}
        />
        <InputField
          label="Password 확인"
          placeholder="입력한 비밀번호를 확인 해주세요"
          type="password"
          value={checkPassword}
          onChange={setCheckPassword}
        />
        {signupErrorMessage && (
          <div className="mt-2 text-center text-catch-main-700">
            {signupErrorMessage}
          </div>
        )}
      </div>

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
