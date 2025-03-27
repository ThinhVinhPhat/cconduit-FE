import { useMutation } from "@tanstack/react-query";
import { createPost } from "../../../apis/post/createPost";
import { Article } from "../../../types";
import { enqueueSnackbar } from "notistack";

export const useCreatePost = () => {
  const response = useMutation({
    mutationFn: (data: Article) => createPost(data),
    onSuccess: () => {
      enqueueSnackbar("Post created successfully", {
        variant: "success",
      });
    },
    onError: () => {
      enqueueSnackbar("Failed to create post", {
        variant: "error",
      });
    },
  });

  return {
    ...response,
    data: response.data || null,
  };
};
