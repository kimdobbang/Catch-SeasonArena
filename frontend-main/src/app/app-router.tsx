import { createBrowserRouter } from 'react-router-dom';
import { NotPwaPage } from '@/pages/not-pwa-page';
import { LoginPage } from '@/pages/login-page';
export const AppRouter = () => {
  return createBrowserRouter([
    {
      children: [
        {
          path: '/',
          element: <NotPwaPage />,
        },
        {
          path: '/login',
          element: <LoginPage />,
        },
      ],
    },
  ]);
};
