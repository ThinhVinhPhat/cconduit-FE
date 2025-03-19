import { useQuery } from "@tanstack/react-query"
import { getTag } from "../../../apis/tags/getTags"

export const useGetTag = () => {
  const response = useQuery({
    queryKey: ["tag"],
    queryFn: () => getTag()
  })

  return {
    ...response,
    data: response.data?.data.tags || []
  }

}