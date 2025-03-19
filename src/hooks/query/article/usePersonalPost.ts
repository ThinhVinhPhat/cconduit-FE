import { useQuery } from "@tanstack/react-query";
import { getPersonalPost } from "../../../apis/post/getPosts";
import Cookies from "js-cookie";
export const usePersonalPosts = (name: string) => {
  const response = useQuery({
    queryKey: ["personalPosts" + name],
    queryFn: () => getPersonalPost(name),
    enabled: !!Cookies.get("accessToken"),
  });
  return {
    ...response,
    data: response.data?.data || [],
  };
};
