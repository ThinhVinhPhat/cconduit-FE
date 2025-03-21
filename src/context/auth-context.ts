import { useState } from "react";
import { login, register } from "../apis/auth";
import Cookies from "js-cookie";
import { useGetMe } from "../hooks/query/user/useGetMe";
import { User } from "../types/user";

type AuthContextType = {
  handleLogin: (email: string, password: string) => void;
  handleRegister: (username: string, email: string, password: string) => void;
  handleLogout: () => void;
  userLogin: boolean;
  setUserLogin: (userLogin: boolean) => void;
  error: string;
  setError: (error: string) => void;
  me: User | null;
};

export const useAuthContext = (): AuthContextType => {
  const [userLogin, setUserLogin] = useState(false);
  const [error, setError] = useState("");
  const { data: me } = useGetMe();
  

  //login
  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await login(email, password);
      if (response.accessToken) {
        setUserLogin(true);
        Cookies.set("accessToken", response.accessToken, {
          expires: 1,
        });
      }
    } catch (error: any) {
      if (error.response?.data.statusCode === 404) {
        setError("Invalid email or password");
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
    } catch (error: any) {
      if (error.response?.status === 400) {
        setError("Email already exists");
      }
    }
  };
  //logout
  const handleLogout = () => {
    Cookies.remove("accessToken");
    setUserLogin(false);
  };

  return {
    handleLogin,
    handleRegister,
    handleLogout,
    userLogin,
    setUserLogin,
    error,
    setError,
    me,
  };
};
