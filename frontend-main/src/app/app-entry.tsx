import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "@app/variables.css";
import "./index.css";
import { AppRouter } from "./app-router";
import { store } from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const root = document.getElementById("root") as HTMLElement;
const queryClient = new QueryClient();
ReactDOM.createRoot(root).render(
  <ReduxProvider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={AppRouter()} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </ReduxProvider>,
);
