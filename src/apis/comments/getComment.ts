import server from "..";

export const getComment = async (id: string) => {
  const response = await server.get(`/comment/${id}`);
  return response.data;
};
