import { useContext } from "react";
import  PostContext  from "../context/post-context";

export const usePost = () => {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  
  return context;
};
