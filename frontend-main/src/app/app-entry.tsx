import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "@app/variables.css";
import "./index.css";
import { AppRouter } from "./app-router";
import { appStore } from "./appStore";

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ReduxProvider store={appStore}>
      <RouterProvider router={AppRouter()} />
    </ReduxProvider>
  </React.StrictMode>,
);
