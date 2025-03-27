import { useMutation } from "@tanstack/react-query";
import { Article } from "../../../types";
import { updatePost } from "../../../apis/post/updatePost";
import { enqueueSnackbar } from "notistack";

export const useUpdatePost = () => {
  const response = useMutation({
    mutationFn: (data: Article) => updatePost(data),
    onSuccess: () => {
      enqueueSnackbar("Post updated successfully", {
        variant: "success",
      });
    },
    onError: () => {
      enqueueSnackbar("Failed to update post", {
        variant: "error",
      });
    },
  });

  return {
    ...response,
    data: response?.data?.data || null,
  };
};
