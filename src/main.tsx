import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { PostProvider } from "./context/post-context";
import QueryProvider from "./providers/queryProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <PostProvider>
        <RouterProvider router={routes} />
      </PostProvider>
    </QueryProvider>
  </StrictMode>
);
