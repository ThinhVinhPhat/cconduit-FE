import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";

import QueryProvider from "./providers/queryProvider";
import { SnackbarProvider } from "notistack";
import { ArticleContextProvider } from "./context/post-context";
import { AuthContextProvider } from "./context/auth-context";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <SnackbarProvider maxSnack={3}>
        <AuthContextProvider>
          <ArticleContextProvider>
            <RouterProvider router={routes} />
          </ArticleContextProvider>
        </AuthContextProvider>
      </SnackbarProvider>
    </QueryProvider>
  </StrictMode>
);
