import { useMutation } from "@tanstack/react-query";
import { createComment } from "../../../apis/comments/createComment";

export const useCreateComment = () => {
  const response = useMutation({
    mutationFn: (data: { id: string; comment: string }) =>
      createComment(data.id, data.comment),
  });
  return {
    ...response,
    data: response.data?.comment || null,
  };
};
