import { useContext } from "react";
import { Context } from "../context/context-provider";

export const usePost = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("usePostContext must be used within a Context Provider");
  }

  return context;
};
