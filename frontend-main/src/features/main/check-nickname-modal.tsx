// src/shared/components/entities/user/modify-nickname-modal.tsx

import { useState, useEffect, useCallback } from "react";
import { checkNicknameExists, changeNicknameSave } from "@/app/apis/memberApi";
import { NicknameInput } from "@atoms/index";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/redux/store";
// import { updateAuthNickname } from "@/app/redux/slice/authSlice";
import { updateUserAndAuthNickname } from "@/app/redux/slice/userSlice";

// Debounce 함수 (중복 체크 최적화)
const debounce = <T extends (...args: Parameters<T>) => Promise<void>>(
  func: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

export const NicknameChangeModal = ({
  isOpen,
  onClose,
  currentNickname,
}: {
  isOpen: boolean;
  onClose: () => void;
  currentNickname: string;
}) => {
  const [nickname, setNicknameState] = useState(currentNickname || "");
  const [isChecking, setIsChecking] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState<boolean | null>(null);
  const [error, setError] = useState("");
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const dispatch: AppDispatch = useDispatch(); // useDispatch에 AppDispatch 타입 적용

  // 중복 확인 API 호출
  const checkNicknameAvailability = useCallback(
    async (name: string): Promise<void> => {
      if (name.trim().length === 0) return;
      setIsChecking(true);
      try {
        const { isDuplicate, error } = await checkNicknameExists(
          accessToken,
          name,
        );
        setIsDuplicate(isDuplicate);
        setError(error || (isDuplicate ? "누군가 선점한 닉네임이에요 😮" : ""));
      } finally {
        setIsChecking(false);
      }
    },
    [],
  );

  const debouncedCheckNickname = useCallback(
    debounce(checkNicknameAvailability, 700),
    [checkNicknameAvailability],
  );

  // 닉네임 변경 처리
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNicknameState(value);
    setError("");

    if (value.trim().length > 0) {
      debouncedCheckNickname(value);
    } else {
      setIsDuplicate(null);
    }
  };

  // 저장 API 호출
  const handleNewNicknameSave = async () => {
    if (!isDuplicate && nickname.trim().length > 0) {
      try {
        await changeNicknameSave(accessToken, nickname);
        dispatch(updateUserAndAuthNickname(nickname));
        onClose();
      } catch {
        setError("닉네임 저장 중 오류 발생");
      }
    }
  };

  useEffect(() => {
    if (nickname !== currentNickname && nickname.trim().length > 0) {
      debouncedCheckNickname(nickname);
    }
  }, [nickname, currentNickname, debouncedCheckNickname]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-5 rounded-lg bg-catch-sub-200 w-80">
        <h3 className="mb-4 font-bold text">
          가을에 어울리는 특별한 닉네임을 지어주세요
        </h3>
        <label htmlFor="nickname" className="text-catch-gray-400">
          최대 8글자
          <span className="text-red-500 required-dot"> *</span>
        </label>

        <NicknameInput
          nickname={nickname}
          onChange={handleNicknameChange}
          isDuplicate={isDuplicate}
        />

        {isDuplicate === false && (
          <p className="mt-2 text-green-500"> 훌륭한 닉네임이에요 😊</p>
        )}
        {isDuplicate === true && <div className="relative mt-2"></div>}
        {error && <p className="mt-2 text-red-500">{error}</p>}

        <div className="flex justify-end mt-4 space-x-2">
          <button
            className="p-2 rounded font-pretendard text-catch-gray-999 bg-catch-gray-200"
            onClick={onClose}
            disabled={isChecking}
          >
            취소
          </button>
          <button
            onClick={handleNewNicknameSave}
            className={`p-2 font-pretendard text-catch-gray-000 rounded-xs ${
              isChecking || isDuplicate || nickname.trim().length === 0
                ? "bg-gray-300 opacity-50 cursor-not-allowed"
                : "bg-catch-main-400"
            }`}
            disabled={isChecking || isDuplicate || nickname.trim().length === 0}
          >
            변경
          </button>
        </div>
      </div>
    </div>
  );
};
