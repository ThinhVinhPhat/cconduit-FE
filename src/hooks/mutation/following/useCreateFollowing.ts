import { useMutation } from "@tanstack/react-query";
import { createFollowing } from "../../../apis/following/create-following";
import { enqueueSnackbar } from "notistack";

export const useCreateFollowing = () => {
  const response = useMutation({
    mutationFn: (id: string) => createFollowing(id),
    onSuccess: () => {
      enqueueSnackbar("Handle following successfully", {
        variant: "success",
      });
    },
    onError: () => {
      enqueueSnackbar("Failed to handle following", {
        variant: "error",
      });
    },
  });
  return {
    ...response,
    data: response.data?.data ?? null,
  };
};
