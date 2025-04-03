import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import { login, register } from "../apis/auth";
import Cookies from "js-cookie";
import { enqueueSnackbar } from "notistack";
import { useGetImageAuth } from "./query/image-upload/getAuth";

export const useAuthAction = () => {
  const { setUserLogin, setError } = useAuthContext();
  const { data: imageAuth } = useGetImageAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      setUserLogin(true);
    }
  }, [setUserLogin]);

  //login
  const handleLogin = async (email: string, password: string) => {
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
  const handleRegister = async (
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

  //logout
  const handleLogout = () => {
    Cookies.remove("accessToken");
    setUserLogin(false);
    queryClient.clear();
    enqueueSnackbar("Logout successfully", {
      variant: "success",
    });
  };

  return {
    imageAuth,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
