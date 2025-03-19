import { useQuery } from "@tanstack/react-query";
import { getFavoritePosts } from "../../../apis/post/getPosts";
import Cookies from "js-cookie";
export const useFavoritePosts = () => {
  const response = useQuery({
    queryKey: ["favoritePosts"],
    queryFn: () => getFavoritePosts(),
    enabled: !!Cookies.get("accessToken"),
  });
  return {
    ...response,
    data: response.data?.articles || [],
  };
};
