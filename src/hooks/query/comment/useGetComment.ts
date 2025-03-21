import { useQuery } from "@tanstack/react-query";
import { getComment } from "../../../apis/post/getComment";

export const useGetComment = (id: string) => {
  const response = useQuery({
    queryKey: ["comment", id],
    queryFn: () => getComment(id),
  });
  return {
    ...response,
    data: response.data?.comments,
  };
};
