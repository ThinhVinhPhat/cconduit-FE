import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { deleteComment } from "../../../apis/comments/deleteComment";

export const useDeleteComment = () => {
  const response = useMutation({
    mutationFn: (id: string) => deleteComment(id),
    onSuccess: () => {
      enqueueSnackbar("Comment deleted successfully", {
        variant: "success",
      });
    },
    onError: () => {
      enqueueSnackbar("Failed to delete comment", {
        variant: "error",
      });
    },
  });
  return {
    ...response,
    data: response.data?.data || {},
  };
};

