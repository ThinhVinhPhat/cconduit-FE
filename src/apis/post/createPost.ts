import server from "../index";

export const createPost = async (data: any) => {
  const response = await server.post("/articles", data);
  return response.data;
};
