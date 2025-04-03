import { useQuery } from "@tanstack/react-query";
import { getFollowers } from "../../../apis/following/get-follower";
import Cookies from "js-cookie";
export const useGetFollower = () => {
  const response = useQuery({
    queryKey: ["get-follower"],
    queryFn: () => getFollowers(),
    enabled: !!Cookies.get("accessToken"),
  });
  return {
    ...response,
    data: response.data?.data || [],
  };
};
