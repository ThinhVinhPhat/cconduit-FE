import { useQuery } from "@tanstack/react-query";
import { getFavoritePosts } from "../../../apis/post/getPosts";
import Cookies from "js-cookie";
export const useFavoritePosts = (offset: number, limit: number) => {
  const response = useQuery({
    queryKey: ["favoritePosts", offset + limit],
    queryFn: () => getFavoritePosts(offset, limit),
    enabled: !!Cookies.get("accessToken"),
  });
  return {
    ...response,
    data: response.data?.data || [],
  };
};
