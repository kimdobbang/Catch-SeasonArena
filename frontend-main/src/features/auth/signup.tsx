// src/features/auth/signup.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputField, SignupButton, IconTextButton, Leave } from "@atoms/index";
import { ServiceTitle, Copyright } from "@ui/index";
import { signUpUser, checkEmailExists } from "@/app/apis/authApi";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "@/app/redux/slice/authSlice";

export const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState<string>("");

  const [emailAvailable, setEmailAvailable] = useState<boolean>(false);
  const [emailerrorMessage, setEmailErrorMessage] = useState<string>("");
  const [signupErrorMessage, setSignupErrorMessage] = useState<string>("");

  // 이메일 중복 확인 (API 호출)
  const checkEmail = async () => {
    try {
      const exists = await checkEmailExists(email);
      if (exists) {
        setEmailAvailable(true);
        setEmailErrorMessage("반갑습니다");
      } else {
        setEmailAvailable(false);
        setEmailErrorMessage("이미 사용 중인 이메일입니다.");
      }
    } catch (error) {
      setEmailAvailable(false);
      setEmailErrorMessage("이메일 중복 확인 실패");
      console.error("중복 확인 에러:", error);
    }
  };

  // 회원가입 처리
  const handleSignup = async () => {
    if (!email || !password || !checkPassword) {
      setSignupErrorMessage("가입정보를 입력해주세요.");
      return;
    }
    if (!emailAvailable) {
      setSignupErrorMessage("이메일 중복 확인을 해주세요.");
      return;
    }

    if (password !== checkPassword) {
      setSignupErrorMessage("비밀번호가 일치하지 않습니다.");
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
      setSignupErrorMessage("회원가입에 실패했습니다.");
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
        {emailerrorMessage && (
          <div className="mt-0 text-catch-main-400">{emailerrorMessage}</div>
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
        {signupErrorMessage && (
          <div className="mt-2 text-center text-catch-main-700">
            {signupErrorMessage}
          </div>
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
