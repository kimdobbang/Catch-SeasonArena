import { ItemType } from "@/app/types/common";
import { ItemGrade } from "@/app/types/common";
interface DescBoxProps {
  type: ItemType;
  grade: ItemGrade;
  skill: string;
}

export const DescriptionBox: React.FC<DescBoxProps> = ({
  type,
  grade,
  skill,
}) => {
  const getType = () => {
    switch (type) {
      case "weapon":
        return "무기";
      case "active":
        return "액티브 스킬";
      case "passive":
        return "패시브 스킬";
    }
  };

  const getGrade = () => {
    switch (grade) {
      case "normal":
        return "노멀";
      case "rare":
        return "레어";
      case "legend":
        return "레전드";
    }
  };

  return (
    <div className="pl-[24px] w-[296px] h-[131px] rounded-lg flex flex-col justify-center bg-catch-sub-100 border-catch-sub-200 border-2">
      <p className="font-bold text-body1">[{getType()}]</p>
      <p className="text-body1">등급 : {getGrade()}</p>
      <p className="text-body1">스킬 : {skill}</p>
    </div>
  );
};
