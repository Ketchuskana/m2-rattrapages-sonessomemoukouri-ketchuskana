import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./app/router";
import AppProviders from "./app/providers";
import { setupAuthInterceptors } from "./features/auth/api/authInterceptors";

import "./index.css";

setupAuthInterceptors();

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </React.StrictMode>
);