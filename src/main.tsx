import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { ContextProvider } from "./context/context-provider";
import QueryProvider from "./providers/queryProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <ContextProvider>
        <RouterProvider router={routes} />
      </ContextProvider>
    </QueryProvider>
  </StrictMode>
);
