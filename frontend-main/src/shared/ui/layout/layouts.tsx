import { Outlet } from "react-router-dom";
import { Header } from "./header";
import { TabNoBackground } from "./tab-no-background";

// 일반 레이아웃
export const Layout = () => {
  return (
    <div className="w-full h-full">
      <Outlet />
    </div>
  );
};

// header와 tab이 있는 레이아웃
export const MainLayout = () => {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Header가 맨 위에 고정 */}
      <Header className="w-full" />

      {/* Outlet이 flex-grow를 사용하여 중간 공간을 모두 차지 */}
      <div className="w-full" style={{ minHeight: "calc(100% - 235px)" }}>
        <Outlet />
      </div>

      {/* TabNoBackground가 맨 아래에 고정 */}
      <div className="w-full ">
        <TabNoBackground className="w-full " />
      </div>
    </div>
  );
};

// header만 있는 레이아웃
export const HeaderLayout = () => {
  return (
    <div className="w-full h-full">
      <Header />
      <Outlet />
    </div>
  );
};
