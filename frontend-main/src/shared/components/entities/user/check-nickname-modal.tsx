// src\shared\components\entities\user\modify-nickname-modal.tsx
import { useState, useEffect, useCallback } from "react";
import { checkNicknameExists, changeNicknameSave } from "@/app/apis/memberApi";
import { NicknameInput } from "@atoms/index";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { setNickname } from "@/app/redux/slice/authSlice";

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
  const [nickname, setNicknameState] = useState(currentNickname || ""); // 초기값 빈 문자열로 설정
  const [isChecking, setIsChecking] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState<boolean | null>(null);
  const [error, setError] = useState("");
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const dispatch = useDispatch();

  const checkNicknameAvailability = useCallback(
    async (accessToken: string, name: string): Promise<void> => {
      setIsChecking(true);
      try {
        const result = await checkNicknameExists(accessToken, name);
        setIsDuplicate(result);
        setError(result ? "누군가 선점한 닉네임이에요😮" : "");
      } catch (error) {
        setError("중복확인 오류! 다시 시도해주세요😅");
        console.log(error);
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

  const handleNicknameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNicknameState(e.target.value);
    },
    [],
  );

  const handleNewNicknameSave = useCallback(async () => {
    if (isDuplicate === false && nickname.trim().length > 0) {
      try {
        await changeNicknameSave(accessToken, nickname);
        dispatch(setNickname(nickname));
        onClose();
      } catch (error) {
        setError("닉네임 저장 중 오류 발생");
        console.log(error);
      }
    }
  }, [nickname, isDuplicate, dispatch, onClose]);

  useEffect(() => {
    if (nickname !== currentNickname && nickname.trim().length > 0) {
      debouncedCheckNickname(accessToken, nickname);
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
              isChecking ||
              isDuplicate === true ||
              error ||
              nickname.trim().length === 0 // 공백 문자열 처리
                ? "bg-gray-300 opacity-50 cursor-not-allowed"
                : "bg-catch-main-400"
            }`}
            disabled={
              isChecking ||
              isDuplicate === true ||
              !!error ||
              nickname.trim().length === 0 // 공백 또는 undefined 처리
            }
          >
            변경
          </button>
        </div>
      </div>
    </div>
  );
};
