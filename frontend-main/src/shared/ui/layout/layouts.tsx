import { Outlet } from "react-router-dom";
import { Header } from "./header";
import { BottomNavBar } from "./bottom-nav-bar";

export const Layout = () => {
  return (
    <div className="w-full h-full">
      <Outlet />
    </div>
  );
};

export const MainLayout = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <Header className="w-full" />

      {/* Outlet이 flex-grow를 사용하여 중간 공간을 모두 차지 */}
      <div className="w-full" style={{ minHeight: "calc(100% - 235px)" }}>
        <Outlet />
      </div>

      {/* TabNoBackground가 맨 아래에 고정 */}
      <div className="w-full ">
        <BottomNavBar className="w-full " />
      </div>
    </div>
  );
};

export const HeaderLayout = () => {
  return (
    <div className="w-full h-full">
      <Header />
      <div className="w-full" style={{ height: "calc(100% - 65px)" }}>
        <Outlet />
      </div>
    </div>
  );
};