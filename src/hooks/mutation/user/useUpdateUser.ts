import { enqueueSnackbar } from "notistack";
import { updateUser } from "../../../apis/auth";
import { useMutation } from "@tanstack/react-query";
import { IFormInput } from "../../../types/user";

export const useUpdateUser = () => {
  const response = useMutation({
    mutationFn: (data: IFormInput) => updateUser(data),
    onSuccess: () => {
      enqueueSnackbar("Update user successfully", { variant: "success" });
    },
    onError: () => {
      enqueueSnackbar("Update user failed", { variant: "error" });
    },
  });
  return {
    ...response,
    data: response?.data?.user,
  };
};
