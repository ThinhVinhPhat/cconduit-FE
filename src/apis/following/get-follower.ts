import server from "..";
import Cookies from "js-cookie";

export const getFollowers = async () => {
  const response = await server.get(`/following/get-followers`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
  return response.data;
};
