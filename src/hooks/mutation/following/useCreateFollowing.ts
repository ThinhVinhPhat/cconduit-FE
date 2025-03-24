import { useMutation } from "@tanstack/react-query";
import { createFollowing } from "../../../apis/following/create-following";

export const useCreateFollowing = () => {
  const response = useMutation({
    mutationFn: (id: string) => createFollowing(id),
  });
  return {
    ...response,
    data: response.data?.data ?? null,
  };
};
