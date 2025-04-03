import sever from "../index";
import Cookies from "js-cookie";

export const getPosts = async (
  id: string | undefined,
  skip: number,
  limit: number
) => {
  const response = await sever.get(
    `/articles?userId=${id}&offset=${skip}&limit=${limit}`
  );
  return response.data;
};

export const getPersonalPost = async (
  name: string,
  followers: string[],
  offset: number,
  limit: number
) => {
  const response = await sever.get(
    `/articles?author=${name}&followers=${followers}&offset=${offset}&limit=${limit}`,
    {}
  );
  return response.data;
};

export const getFavoritePosts = async (offset: number, limit: number) => {
  const response = await sever.get(`/articles/favorite?offset=${offset}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
  return response.data;
};

export const getTagPost = async (tags: string[]) => {
  const params = new URLSearchParams();

  tags.forEach((tag) => params.append("tags", tag));

  const response = await sever.get(`/articles?${params.toString()}`);
  return response.data;
};

export const getPostDetail = async (
  slug: string | undefined,
  id: string | undefined
) => {
  const response = await sever.get(`/articles/${slug}?userId=${id}`);
  return response.data;
};
