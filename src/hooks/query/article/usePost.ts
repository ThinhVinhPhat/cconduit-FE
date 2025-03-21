import { useQuery } from "@tanstack/react-query";

import { getPostDetail } from "../../../apis/post/getPosts";

export const usePost = (slug: string | undefined) => {
  const response = useQuery({
    queryKey: ["post", slug],
    queryFn: async () => await getPostDetail(slug),
    enabled: !!slug,
  });
  return {
    ...response,
    data: response.data?.article || {},
  };
};
