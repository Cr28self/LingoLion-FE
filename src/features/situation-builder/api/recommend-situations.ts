import { useAuthApiClient } from "@/lib/auth/useAuthApiClient";
import { TRecommend } from "@/types/api";
import { queryOptions, useMutation } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export const recommendSituation = async (
  apiClient: AxiosInstance,
  data: TRecommend
) => {
  const response = await apiClient.post("/situations/recommend", data);
  return response.data;
};

// export const recommendSituationQueryOptions = () => {
//   return queryOptions({});
// };

export const useRecommendSituations = () => {
  const authApiClient = useAuthApiClient();

  return useMutation({
    mutationFn: (data: TRecommend) => recommendSituation(authApiClient, data),
  });
};
