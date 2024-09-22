import { TabBackground } from "./tab-background";
import { TabNoBackground } from "./tab-no-background";

interface TabWithBgProps {
  className?: string;
}
export const TabWithBackground: React.FC<TabWithBgProps> = ({ className }) => {
  return (
    <div className={`relative min-h-[170px] ${className}`}>
      <TabNoBackground />
      {/* FooterBackground를 absolute로 위치 조정 */}
      <TabBackground className="absolute bottom-0 w-full h-[190px]" />
    </div>
  );
};
