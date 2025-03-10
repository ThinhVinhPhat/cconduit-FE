import sever from "../index";
import Cookies from "js-cookie";


export const getPosts = async () => {
  const response = await sever.get("/articles");
  return response.data;
};

export const getPersonalPost = async () => {
  const response = await sever.get(`/articles/find-by-user`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
  return response.data;
};
