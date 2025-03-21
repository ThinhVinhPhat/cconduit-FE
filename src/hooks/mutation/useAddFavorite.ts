import { useMutation } from "@tanstack/react-query";
import { addFavorite } from "../../apis/post/addFavorite";

export const useAddFavorite = () => {
  const response = useMutation({
    mutationFn: (articleId: string) => addFavorite(articleId),
  });

  return {
    ...response,
    data: response.data || null,
  };
};
