import { useMutation } from "@tanstack/react-query";
import { Article } from "../../../types";
import { updatePost } from "../../../apis/post/updatePost";

export const useUpdatePost = () => {
  const response = useMutation({
    mutationFn: (data: Article) => updatePost(data),
  });

  return {
    ...response,
    data: response?.data?.data || null,
  };
};
