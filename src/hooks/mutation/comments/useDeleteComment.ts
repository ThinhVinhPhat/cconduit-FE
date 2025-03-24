import { useMutation } from "@tanstack/react-query";

import { deleteComment } from "../../../apis/comments/deleteComment";

export const useDeleteComment = () => {
  const response = useMutation({
    mutationFn: (id: string) => deleteComment(id),
  });
  return {
    ...response,
    data: response.data?.data || {},
  };
};

