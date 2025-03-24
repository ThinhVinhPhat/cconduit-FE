import server from "..";

export const deletePost = async (id: string) => {
  const response = await server.delete(`/articles/${id}`);
  return response.data;
};
