import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../apis/auth";
import Cookies from "js-cookie";
export const useGetMe = () => {
  const respond = useQuery({
    queryKey: ["me"],
    queryFn: () => getUser(),
    enabled: !!Cookies.get("accessToken"),
  });
  return {
    ...respond,
    data: respond.data?.data || null,
  };
};
