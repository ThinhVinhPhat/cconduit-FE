import { useQuery } from "@tanstack/react-query";
import { Tag } from "../../../types/tags";
import { getTagPost } from "../../../apis/post/getPosts";

function useGetByTags(tags: Tag[]) {
  const response = useQuery({
    queryKey: ["tags" + tags.join(',')],
    queryFn: () => getTagPost(tags.map(item => item.title))
  })
  return {
    ...response,
    data: response?.data?.data.articles || []
  }
}

export default useGetByTags;