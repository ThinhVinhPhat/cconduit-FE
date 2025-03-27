import { useQuery } from "@tanstack/react-query";
import { getImageAuth } from "../../../apis/image-upload";
import Cookies from "js-cookie";
export const useGetImageAuth = () => {
  const response = useQuery({
    queryKey: ["imageAuth"],
    queryFn: () => getImageAuth(),
    enabled: !!Cookies.get("accessToken"),
  });
  return {
    ...response,
    data: response.data,
  };
};
