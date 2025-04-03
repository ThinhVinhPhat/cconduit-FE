import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../apis/post/getPosts";

export const useGetPost = (
  id: string | undefined,
  skip: number,
  limit: number
) => {
  const response = useQuery({
    queryKey: ["posts", skip],
    queryFn: () => getPosts(id, skip, limit),
  });

  return {
    ...response,
    data: response.data?.data || [],
  };
};
