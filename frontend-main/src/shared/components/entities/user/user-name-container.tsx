import Pencil from "@/assets/icons/pencil.svg?react";
import { useState } from "react";
import { Body2Text, TierBadge } from "../../atoms";
import { NicknameChangeModal } from "@/features/main/check-nickname-modal";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

interface UserNameContainerProps {
  className?: string;
}
export const UserNameContainer = ({ className }: UserNameContainerProps) => {
  const { nickname, rating, tier } = useSelector(
    (state: RootState) => state.user,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div
      className={`bg-gradient-to-r p-3 from-catch-sub-300 to-catch-main-400 flex flex-row rounded-xl w-[293px] h-[77px] bg-catch-main-400 ${className}`}
    >
      <div className="w-[20%] h-full flex items-center justify-center">
        <TierBadge rating={rating} />
      </div>

      <div className="pl-3 w-[70%] h-full flex flex-col justify-center">
        <Body2Text className="!text-left text-white">{nickname}</Body2Text>
        <Body2Text className="!text-left text-white">
          {tier} · {rating}
        </Body2Text>
      </div>
      <div className="w-[10%] h-full flex flex-col justify-start">
        <button onClick={openModal}>
          <Pencil />
        </button>
      </div>
      {isModalOpen && (
        <NicknameChangeModal
          isOpen={isModalOpen}
          onClose={closeModal}
          currentNickname={nickname}
        />
      )}
    </div>
  );
};
