import { useState } from "react";
import { login, register } from "../apis/auth";
import Cookies from "js-cookie";
import { useGetMe } from "../hooks/query/user/useGetMe";
import { User } from "../types/user";
import { useGetImageAuth } from "../hooks/query/image-upload/getAuth";
import { enqueueSnackbar } from "notistack";

type AuthContextType = {
  error: string;
  userLogin: boolean;
  me: User | null;
  imageAuth: any;
  handleLogin: (email: string, password: string) => void;
  handleRegister: (username: string, email: string, password: string) => void;
  handleLogout: () => void;
  setUserLogin: (userLogin: boolean) => void;
  setError: (error: string) => void;
};

export const useAuthContext = (): AuthContextType => {
  const [userLogin, setUserLogin] = useState(false);
  const [error, setError] = useState("");
  const { data: me } = useGetMe();
  const { data: imageAuth } = useGetImageAuth();

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
    enqueueSnackbar("Logout successfully", {
      variant: "success",
    });
  };

  return {
    userLogin,
    error,
    me,
    imageAuth,
    handleLogin,
    handleRegister,
    handleLogout,
    setUserLogin,
    setError,
  };
};
