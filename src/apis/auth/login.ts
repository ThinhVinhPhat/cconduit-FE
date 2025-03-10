import sever from "../index";

export const login = async (email: string, password: string) => {
  const response = await sever.post("/auth/login", { email, password });
  return response.data;
};

export const register = async (username: string, email: string, password: string) => {
  const response = await sever.post("/users", { username, email, password });
  return response.data;
};



