import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { ContextProvider } from "./context/context-provider";
import QueryProvider from "./providers/queryProvider";
import { SnackbarProvider } from "notistack";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <SnackbarProvider maxSnack={3}>
        <ContextProvider>
          <RouterProvider router={routes} />
        </ContextProvider>
      </SnackbarProvider>
    </QueryProvider>
  </StrictMode>
);
