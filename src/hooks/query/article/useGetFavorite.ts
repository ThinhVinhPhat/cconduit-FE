import { useQuery } from "@tanstack/react-query";
import { getFavoritePosts } from "../../../apis/post/getPosts";
import Cookies from "js-cookie";
export const useFavoritePosts = () => {
  const response = useQuery({
    queryKey: ["favoritePosts", Cookies.get("accessToken")],
    queryFn: () => getFavoritePosts(),
    enabled: !!Cookies.get("accessToken"),
  });
  return {
    ...response,
    data: response.data?.data || [],
  };
};
