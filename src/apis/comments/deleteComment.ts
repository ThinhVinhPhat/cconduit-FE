import server from "..";

export const deleteComment = async (id: string) => {
  const response = await server.delete(`/comment/${id}`);
  return response.data;
};
