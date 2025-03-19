import sever from "../index";
import Cookies from "js-cookie";
export const login = async (email: string, password: string) => {
  const response = await sever.post("/auth/login", { email, password });
  return response.data;
};

export const register = async (username: string, email: string, password: string) => {
  const response = await sever.post("/users", { username, email, password, role: "USER" });
  return response.data;
};

export const getUser = async () => {
  const response = await sever.get("/users/me",{
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
  return response.data;
};



