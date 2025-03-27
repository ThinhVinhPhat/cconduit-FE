import axios from "axios";
import Cookies from "js-cookie";
import server from "..";

export const getImageAuth = async () => {
  const response = await server.get(`/file/imagekit-auth`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
  return response.data;
};

export const uploadImage = async (
  file: File,
  token: string,
  signature: string,
  publicKey: string,
  expire: string
) => {
  const response = await axios.post(
    `https://upload.imagekit.io/api/v1/files/upload`,
    {
      file: file,
      fileName: file.name,
      token: token,
      signature: signature,
      expire: expire,
      publicKey: publicKey,
    }
  );
  return response.data;
};
