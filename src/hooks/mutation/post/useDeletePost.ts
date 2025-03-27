import { useMutation } from "@tanstack/react-query";
import { deletePost } from "../../../apis/post/deletePost";
import { enqueueSnackbar } from "notistack";

export const useDeletePost = () => {
  const response = useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () => {
      enqueueSnackbar("Post deleted successfully", {
        variant: "success",
      });
    },
    onError: () => {
      enqueueSnackbar("Failed to delete post", {
        variant: "error",
      });
    },
  });

  return {
    ...response,
    data: response.data || null,
  };
};
