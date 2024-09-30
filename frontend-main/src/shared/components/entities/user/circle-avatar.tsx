//AvatarFace 파일 크기 수정가능하게 바꿔야 함 (지금은 안됨 ㅠ)
import { AvatarFace, CircleTag } from "../../atoms";

interface CircleAvatarProps {
  number: number; // 아바타 번호(필수입력)
  emotion: "normal" | "sad"; // 감정(필수입력)
  avatarIcon: boolean; // 아바타 변경 아이콘
  width?: string | number; // width (선택 입력)
  height?: string | number; // height (선택 입력)
  className?: string; // 추가 적용할 속성
}

export const CircleAvatar: React.FC<CircleAvatarProps> = ({
  number = 1,
  emotion = "normal",
  avatarIcon = false,
  width = 96, // 기본 width
  height = 96, // 기본 height
  className,
}) => {
  return (
    <div className="w-auto h-auto">
      <div
        className={`${className} w-[96px] h-[96px] flex items-center justify-center rounded-full border border-catch-sub-300`}
      >
        <AvatarFace
          number={number}
          emotion={emotion}
          width={width}
          height={height}
        />
      </div>
      {avatarIcon && (
        <CircleTag
          icon="person"
          className="relative left-16 bottom-6 bg-catch-sub-400"
        />
      )}
    </div>
  );
};
