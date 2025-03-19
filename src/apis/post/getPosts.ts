import { Tag } from "../../types/tags";
import sever from "../index";
import Cookies from "js-cookie";

export const getPosts = async () => {
  const response = await sever.get("/articles");
  return response.data;
};

export const getPersonalPost = async (name: string) => {
  const response = await sever.get(`/articles?author=${name}`, {
  });
  return response.data;
};

export const getFavoritePosts = async () => {
  const response = await sever.get(`/articles/favorite`,{
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    }
  })
  return response.data
}

export const getTagPost = async (tags: string[]) => {
  const params = new URLSearchParams();

  tags.forEach((tag) => params.append("tags", tag));


  const response = await sever.get(`/articles?${params.toString()}`);
  return response.data;
};
