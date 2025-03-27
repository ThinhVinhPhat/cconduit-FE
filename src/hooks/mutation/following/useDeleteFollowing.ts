import { useMutation } from "@tanstack/react-query";
import { deleteFollowing } from "../../../apis/following/delete-following";
import { enqueueSnackbar } from "notistack";

export const useDeleteFollowing = () => {
  const response = useMutation({
    mutationFn: (id: string) => deleteFollowing(id),
    onSuccess: () => {
      enqueueSnackbar("Handle unfollowing successfully", {
        variant: "success",
      });
    },
    onError: () => {
      enqueueSnackbar("Failed to handle unfollowing", {
        variant: "error",
      });
    },
  });
  return {
    ...response,
    data: response.data?.data ?? null,
  };
};
