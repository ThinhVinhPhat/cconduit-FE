import server from "..";

export const createFollowing = async (id: string) => {
  const response = await server.post(`/following/${id}`);
  return response.data;
};
