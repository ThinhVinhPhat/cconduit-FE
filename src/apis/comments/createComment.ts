import server from "..";

export const createComment = async (id: string, comment: string) => {
  const response = await server.post(`/comment/${id}`, {
    content: comment,
  });
  return response.data;
};
