import Leave from "@/assets/icons/sleave-icon.svg?react";

type TabBackgroundProps = { className: string };

export const TabBackground: React.FC<TabBackgroundProps> = ({ className }) => {
  return (
    <div
      className={`h-[150px] w-full bg-catch-sub-100 rounded-t-[60%] -z-10 ${className}`}
    >
      <Leave className="w-[54px] h-[54px] fill-catch-sub-200" />
      <Leave className="fill-catch-sub-200 relative left-52 bottom-16 w-[33px] h-[33px] -scale-x-100 rotate-3" />
      <Leave className="fill-catch-sub-200 relative left-80 bottom-14 w-[44px] h-[44px] -rotate-12" />
    </div>
  );
};
