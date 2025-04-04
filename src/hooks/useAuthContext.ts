import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useArticleContextContext must be used within a Context Provider"
    );
  }

  return context;
};
