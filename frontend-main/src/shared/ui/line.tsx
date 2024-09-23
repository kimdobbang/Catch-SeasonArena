/* 카드에 들어가는 한 줄 */
interface LineProps {
  className?: string;
}

// 사용할 때 bg-color 를 className에 꼭 입력해야 함
export const Line: React.FC<LineProps> = ({ className }) => {
  return <div className={`w-[160px] h-[5px] rounded-xl ${className} `}></div>;
};
