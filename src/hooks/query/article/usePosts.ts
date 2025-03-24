import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../apis/post/getPosts";

export const useGetPost = (id: string | undefined) => {
  const response = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(id),
  });

  return {
    ...response,
    data: response.data?.data || [],
  };
};
