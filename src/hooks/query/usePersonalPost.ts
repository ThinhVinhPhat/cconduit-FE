import { useQuery } from "@tanstack/react-query";
import { getPersonalPost } from "../../apis/post/getPosts";
import Cookies from "js-cookie";
export const usePersonalPosts = () => {
  const response = useQuery({
    queryKey: ["personalPosts"],
    queryFn: () => getPersonalPost(),
    enabled: !!Cookies.get("accessToken"),
  });
  return {
    ...response,
    data: response.data?.data || [],
  };
};
