import { Outlet } from "react-router-dom";
import { Header } from "@widgets/index";

export const Layout = () => {
  return (
    <div className="w-full h-full">
      <Outlet />
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
