import { createBrowserRouter } from "react-router-dom";
import { NotPwaPage } from "@/pages/not-pwa-page";
import { LoginPage } from "@/pages/login-page";
import { SignupPage } from "@/pages/signup-page";
import { HeaderLayout, Layout, MainLayout } from "@/shared/ui/index";
import { Main } from "@/features/main/main";
import { Ranking } from "@/features/main/ranking";
import { Avartar } from "@/features/main/avartar";
import { Collect } from "@/features/collect/collect";
import { Inventory } from "@/features/inventory/inventory";
import { DesktopWarningPage } from "@/pages/desktop-warning-page";
import { RootPage } from "@/pages/root-page";

export const AppRouter = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <RootPage />,
    },
    {
      element: <Layout />,
      errorElement: <div>에러발생 1</div>,
      children: [
        /* pwa 페이지, 모바일요청 페이지*/
        /* 로그인, 회원가입, 매칭대기실 */
        /* 수집, 수집게임, 수집 결과, 합성 결과, 게임 결과*/
        {
          path: "/pwa",
          element: <NotPwaPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/signup",
          element: <SignupPage />,
        },
        {
          path: "/collect",
          element: <Collect />,
        },
        {
          path: "/desktop-warning",
          element: <DesktopWarningPage />,
        },
      ],
    },
    {
      element: <MainLayout />,
      errorElement: <div>에러발생 2</div>,
      children: [
        /* 메인, 랭킹, 도감, 배낭, 합성, 매칭*/
        {
          path: "/main",
          element: <Main />,
        },
        {
          path: "/ranking",
          element: <Ranking />,
        },
        {
          path: "/inventory",
          element: <Inventory />,
        },
      ],
    },
    {
      element: <HeaderLayout />,
      errorElement: <div>에러발생 3</div>,
      children: [
        /* 아바타, 도감, 인벤토리, 합성 */
        {
          path: "/avartar",
          element: <Avartar />,
        },
      ],
    },
  ]);
};
