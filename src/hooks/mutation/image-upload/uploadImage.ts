import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "../../../apis/image-upload";

export const useUploadImage = () => {
  const response = useMutation({
    mutationFn: (data: {
      file: File;
      token: string;
      signature: string;
      expire: string;
      publicKey: string;
    }) =>
      uploadImage(
        data.file,
        data.token,
        data.signature,
        data.expire,
        data.publicKey
      ),
  });
  return {
    ...response,
    data: response.data || null,
  };
};
