import { useMutation } from "@tanstack/react-query";
import { deletePost } from "../../../apis/post/deletePost";

export const useDeletePost = () => {
  const response = useMutation({
    mutationFn: (id: string) => deletePost(id),
  });

  return {
    ...response,
    data: response.data || null,
  };
};
