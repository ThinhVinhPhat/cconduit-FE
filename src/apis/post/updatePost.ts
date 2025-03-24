import server from "..";
import Cookies from "js-cookie";
export const updatePost = async (data: any) => {
  const response = await server.patch(`/articles/${data.id}`, {
    article: {
      title: data.title,
      shortDescription: data.description,
      description: data.body,
      tags: data.tags,
    },
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
  return response.data;
};
