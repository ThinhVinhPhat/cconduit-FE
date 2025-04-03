import server from "../index";
import Cookies from "js-cookie";

export const createPost = async (data: any) => {
  const response = await server.post("/articles", {
    article: {
      title: data.title,
      shortDescription: data.shortDescription,
      description: data.description,
      tags: data.tags,
    },
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
  return response.data;
};
