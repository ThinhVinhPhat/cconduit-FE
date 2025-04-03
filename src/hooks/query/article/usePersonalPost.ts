import { useQuery } from "@tanstack/react-query";
import { getPersonalPost } from "../../../apis/post/getPosts";
import Cookies from "js-cookie";
export const usePersonalPosts = (
  name: string,
  followers: string[],
  offset: number,
  limit: number
) => {
  const response = useQuery({
    queryKey: ["personalPosts" + name + followers + offset + limit],
    queryFn: () => getPersonalPost(name, followers, offset, limit),
    enabled: !!Cookies.get("accessToken"),
  });
  return {
    ...response,
    data: response.data?.data || [],
  };
};
