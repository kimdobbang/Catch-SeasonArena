import { Leave } from "@atoms/index";

type NavBarBackgroundProps = { className: string };

export const NavBarBackground: React.FC<NavBarBackgroundProps> = ({
  className,
}) => {
  return (
    <div
      className={`h-[150px] w-full bg-catch-sub-100 rounded-t-[60%] -z-10 ${className}`}
    >
      <Leave className="w-[54px] h-[54px] fill-catch-sub-200" width="54" />
      <Leave
        className="relative fill-catch-sub-200 left-[60%] bottom-[50%] -scale-x-100 rotate-3"
        width="33"
      />
      <Leave
        className="relative fill-catch-sub-200 left-[90%] bottom-[40%] -rotate-12"
        width="44"
      />
    </div>
  );
};
