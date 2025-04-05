import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import { login, register } from "../apis/auth";
import Cookies from "js-cookie";
import { enqueueSnackbar } from "notistack";
import { useGetImageAuth } from "./query/image-upload/getAuth";
import { useUpdateUser } from "./mutation/user/useUpdateUser";
import ImageKit from "imagekit";

export const useAuthAction = () => {
  const { setUserLogin, setError } = useAuthContext();
  const { data: imageAuth } = useGetImageAuth();
  const {
    data: updateUserData,
    mutate: mutateUpdateUser,
    isPending: isUpdating,
  } = useUpdateUser();
  const queryClient = useQueryClient();

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      setUserLogin(true);
    }
  }, [setUserLogin]);

  //imagekit
  const imageKit = new ImageKit({
    publicKey: "public_EDgp88ndVCN1OaMZMgMXhJwh6yA=",
    urlEndpoint: "https://ik.imagekit.io/qinoqbrbp",
    privateKey: "private_lbRKx8mHgXwOne5YoluvZLslqBk=",
  });

  //login
  const loginUser = async (email: string, password: string) => {
    try {
      const response = await login(email, password);
      if (response.accessToken) {
        setUserLogin(true);
        Cookies.set("accessToken", response.accessToken, {
          expires: 1,
        });
        enqueueSnackbar("Login successfully", {
          variant: "success",
        });
      }
    } catch (error: any) {
      if (error.response?.data.statusCode === 400) {
        setError("Invalid email or password");
        enqueueSnackbar("Invalid email or password", {
          variant: "error",
        });
      }
    }
  };
  //register
  const registerUser = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await register(username, email, password);
      setUserLogin(true);
      Cookies.set("accessToken", response.data.accessToken, {
        expires: 1,
      });
      enqueueSnackbar("Register successfully", {
        variant: "success",
      });
    } catch (error: any) {
      if (error.response?.status === 400) {
        setError("Username and Email must be unique");
        enqueueSnackbar("Username and Email must be unique", {
          variant: "error",
        });
      }
    }
  };

  //update user
  const updateUser = async (data: any) => {
    try {
      const upload =
        data.avatar && typeof data.avatar !== "string"
          ? await imageKit.upload({
              file: data.avatar[0],
              fileName: data.name || "",
              token: imageAuth?.data?.token || "",
              signature: imageAuth?.data?.signature || "",
              expire: imageAuth?.data?.expire || "",
              publicKey: imageAuth?.data?.publicKey || "",
            })
          : null;

      await mutateUpdateUser({
        avatar: upload?.url || data.avatar,
        name: data.name,
        description: data.description,
      });
      return updateUserData;
    } catch (error: any) {
      console.log(error);
      return null;
    }
  };

  //logout
  const logoutUser = () => {
    Cookies.remove("accessToken");
    setUserLogin(false);
    queryClient.clear();
    enqueueSnackbar("Logout successfully", {
      variant: "success",
    });
  };

  return {
    imageAuth,
    isUpdating,
    loginUser,
    registerUser,
    logoutUser,
    updateUser,
  };
};
