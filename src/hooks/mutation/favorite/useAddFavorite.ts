import { useMutation } from "@tanstack/react-query";
import { addFavorite } from "../../../apis/post/addFavorite";
import { enqueueSnackbar } from "notistack";

export const useAddFavorite = () => {
  const response = useMutation({
    mutationFn: (articleId: string) => addFavorite(articleId),
    onSuccess: () => {
      enqueueSnackbar("Handle favorite successfully", {
        variant: "success",
      });
    },
    onError: () => {
      enqueueSnackbar("Failed to add favorite", {
        variant: "error",
      });
    },
  });

  return {
    ...response,
    data: response.data || null,
  };
};
