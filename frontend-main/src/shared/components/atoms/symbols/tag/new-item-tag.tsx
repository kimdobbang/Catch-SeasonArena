/* 새로 수집한 아이템인지 표시하는 태그 */
interface NewItemTagProps {
  text?: string;
  className?: string;
}

export const NewItemTag: React.FC<NewItemTagProps> = ({ text, className }) => {
  return (
    <div
      className={`w-[60px] h-[24px] bg-catch-sub-400 shrink-0 text-center ${className}`}
    >
      <p className="text-body2 text-white">{text || `NEW`}</p>
    </div>
  );
};
