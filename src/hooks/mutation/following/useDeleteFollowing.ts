import { useMutation } from "@tanstack/react-query";
import { deleteFollowing } from "../../../apis/following/delete-following";

export const useDeleteFollowing = () => {
  const response = useMutation({
    mutationFn: (id: string) => deleteFollowing(id),
  });
  return {
    ...response,
    data: response.data?.data ?? null,
  };
};
