import React, { useState } from "react";
// import { UseDispatch, useSelector } from "react-redux";
import { InputField, SignupButton, IconTextButton, Leave } from "@atoms/index";
import { ServiceTitle, Copyright } from "@ui/index";

export const Signup: React.FC = () => {
  // const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState<string>("");

  const checkEmail = () => {
    console.log("이메일 중복확인 post요청으로 변경 예정");
  };

  const handleSignup = async () => {
    if (!email || !password || !checkPassword) {
      console.log("이메일과 비밀번호를 모두 입력하세요.");
      return;
    }
    // 가입 로직 추가
  };

  return (
    <div className="flex flex-col justify-around h-screen bg-catch-sub-100">
      {/* 상단 로고 및 서비스 타이틀 */}
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
