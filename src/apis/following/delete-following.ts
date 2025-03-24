import server from "..";

export const deleteFollowing = async (id: string) => {
  const response = await server.delete(`/following/${id}`);
  return response.data;
};
