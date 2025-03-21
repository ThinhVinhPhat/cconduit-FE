import server from "..";
import Cookies from "js-cookie";

export const addFavorite = async (articleId: string) => {
  const response = await server.patch(`/articles/${articleId}/update-Like`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
  return response.data;
};
