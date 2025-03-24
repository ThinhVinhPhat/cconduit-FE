import { useQuery } from "@tanstack/react-query";
import { getComment } from "../../../apis/comments/getComment";

export const useGetComment = (id: string) => {
  const response = useQuery({
    queryKey: ["comment", id],
    queryFn: () => getComment(id),
    enabled: !!id,
  });
  return {
    ...response,
    data: response.data?.data.comments || [],
  };
};
