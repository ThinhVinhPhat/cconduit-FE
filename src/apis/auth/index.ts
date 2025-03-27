import { User } from "../../types/user";
import sever from "../index";
import Cookies from "js-cookie";
export const login = async (email: string, password: string) => {
  const response = await sever.post("/auth/login", { email, password });
  return response.data;
};

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await sever.post("/users", {
    username,
    email,
    password,
    role: "USER",
  });
  return response.data;
};

export const getUser = async () => {
  const response = await sever.get("/users/me", {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
  return response.data;
};

export const updateUser = async (user: any) => {
  const response = await sever.patch(
    `/users`,
    {
      user: {
        name: user.name,
        description: user.description,
        avatar: user.avatar,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    }
  );
  return response.data;
};
