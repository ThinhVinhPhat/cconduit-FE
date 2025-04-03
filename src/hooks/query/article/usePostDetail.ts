import { useQuery } from "@tanstack/react-query";

import { getPostDetail } from "../../../apis/post/getPosts";

export const useArticleDetail = (
  slug: string | undefined,
  id: string | undefined
) => {
  const response = useQuery({
    queryKey: ["post", slug],
    queryFn: async () => getPostDetail(slug, id),
    enabled: !!slug,
  });
  return {
    ...response,
    data: response.data?.data.article || {},
  };
};
