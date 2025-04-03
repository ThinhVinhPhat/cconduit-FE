import { useContext } from "react";
import { ArticleContext } from "../context/post-context";

export const useArticleContext = () => {
  const context = useContext(ArticleContext);

  if (!context) {
    throw new Error(
      "useArticleContextContext must be used within a Context Provider"
    );
  }

  return context;
};
