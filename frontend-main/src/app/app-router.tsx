import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { createBrowserRouter } from "react-router-dom";
import { HeaderLayout, Layout, MainLayout } from "@/shared/ui/index";
import {
  RootPage,
  NotPwaPage,
  OAuthCallbackPage,
  SignupPage,
  LoginPage,
  MainPage,
  AvatarPage,
  RankingPage,
  CollectPage,
  ItemResultPage,
  InventoryPage,
  CombinationPage,
  CollectionbookPage,
  MatchingPage,
  TestPage,
} from "@/pages/index";

// PrivateRoute 컴포넌트
const PrivateRoute = () => {
  // Redux에서 isAuthenticated 상태를 가져옵니다.
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const PublicRoute = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  // 로그인된 사용자가 로그인 페이지나 회원가입 페이지로 접근하면 메인 페이지로 리다이렉트
  return isAuthenticated ? <Navigate to="/main" replace /> : <Outlet />;
};

export const AppRouter = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <RootPage />,
    },
    { path: "/oauth/token/*", element: <OAuthCallbackPage /> },
    {
      path: "/pwa",
      element: <NotPwaPage />,
    },
    {
      element: <PublicRoute />,
      errorElement: <div>에러발생 1</div>,
      children: [
        /* Public Routes */
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/signup",
          element: <SignupPage />,
        },
      ],
    },
    // Private Routes (로그인 사용자만 접근 가능)
    {
      element: <PrivateRoute />, // PrivateRoute로 감싸서 로그인 필요
      children: [
        {
          element: <MainLayout />,
          errorElement: <div>에러발생 2</div>,
          children: [
            {
              path: "/main",
              element: <MainPage />,
            },
          ],
        },
        {
          element: <HeaderLayout />,
          errorElement: <div>에러발생 3</div>,
          children: [
            {
              path: "/inventory",
              element: <InventoryPage />,
            },
            {
              path: "/avatar",
              element: <AvatarPage />,
            },
            {
              path: "/ranking",
              element: <RankingPage />,
            },
            {
              path: "/combination",
              element: <CombinationPage />,
            },
            {
              path: "/collectionbook",
              element: <CollectionbookPage />,
            },
            {
              path: "/matching",
              element: <MatchingPage />,
            },
          ],
        },
        {
          path: "/collect",
          element: <Layout />,
          children: [
            {
              index: true,
              element: <CollectPage />,
            },
            {
              path: ":resultType", // 동적 파라미터 추가
              element: <ItemResultPage />,
            },
          ],
        },
        {
          path: "combination/:resultType", // 동적 파라미터 추가
          element: <ItemResultPage />,
        },
        {
          path: "test", // 동적 파라미터 추가
          element: <TestPage />,
        },
      ],
    },
  ]);
};
