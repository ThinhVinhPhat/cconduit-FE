import { useMutation } from "@tanstack/react-query";
import { createComment } from "../../../apis/comments/createComment";
import { enqueueSnackbar } from "notistack";
export const useCreateComment = () => {
  const response = useMutation({
    mutationFn: (data: { id: string; comment: string }) =>
      createComment(data.id, data.comment),
    onSuccess: () => {
      enqueueSnackbar("Comment created successfully", {
        variant: "success",
      });
    },
    onError: () => {
      enqueueSnackbar("Failed to create comment", {
        variant: "error",
      });
    },
  });
  return {
    ...response,
    data: response.data?.comment || null,
  };
};
