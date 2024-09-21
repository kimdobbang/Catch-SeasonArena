import { createBrowserRouter } from "react-router-dom";
import { NotPwaPage } from "@/pages/not-pwa-page";
import { LoginPage } from "@/pages/login-page";
import { SignupPage } from "@/pages/signup-page";
export const AppRouter = () => {
  return createBrowserRouter([
    {
      children: [
        {
          path: "/",
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
      ],
    },
  ]);
};
