import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../apis/post/getPosts";

export const useGetPost = () => {

  const response = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
  });

  return {
    ...response,
    data: response.data?.data || [],
  };
};
