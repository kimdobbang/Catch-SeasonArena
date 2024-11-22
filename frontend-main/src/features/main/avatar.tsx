import { Body1Text, PrimaryButton } from "@atoms/index";
import { AvatarCollectButton } from "./avatar-collect-button";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useNavigate } from "react-router-dom";
import { changeAvatarSave } from "@/app/apis/memberApi";

export const Avatar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Redux 액션 디스패치
  const avatar = useSelector((state: RootState) => state.user.selectedAvatar);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [changeAvatar, setChangeAvatar] = useState(avatar);

  const onChangeSubmit = () => {
    // API 호출 후 페이지 이동
    if (changeAvatar === avatar) {
      alert("현재와 다른 아바타를 골라주세요!");
    }
    changeAvatarSave(changeAvatar, accessToken, dispatch);
    navigate("/main");
  };

  const handleAvatarClick = (avatarNumber: number) => {
    setChangeAvatar(avatarNumber); // 클릭한 아바타 번호를 설정
  };

  return (
    <div className="flex flex-col w-full h-full gap-10 rounded-t-lg bg-catch-sub-100">
      <Body1Text className="mt-10 text-bold text-catch-main-400">
        아바타를 선택해주세요
      </Body1Text>
      <div className="flex flex-col items-center justify-center mb-10 gap-9">
        <div className="flex flex-row gap-[30px]">
          <AvatarCollectButton
            number={1}
            onClick={() => handleAvatarClick(1)}
            isSelected={changeAvatar === 1}
          />
          <AvatarCollectButton
            number={2}
            onClick={() => handleAvatarClick(2)}
            isSelected={changeAvatar === 2}
          />
        </div>
        <div className="flex flex-row gap-[30px]">
          <AvatarCollectButton
            number={3}
            onClick={() => handleAvatarClick(3)}
            isSelected={changeAvatar === 3}
          />
          <AvatarCollectButton
            number={4}
            onClick={() => handleAvatarClick(4)}
            isSelected={changeAvatar === 4}
          />
        </div>
        <PrimaryButton
          color="main"
          showIcon={false}
          size="small"
          onClick={onChangeSubmit}
        >
          아바타 변경하기
        </PrimaryButton>
      </div>
    </div>
  );
};
