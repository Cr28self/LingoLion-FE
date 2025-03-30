import { useAuthenticatedApiClient } from "@/lib/auth/use-authenticated-api-client";
import { TRecommend } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
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
  const authApiClient = useAuthenticatedApiClient();

  return useMutation({
    mutationFn: (data: TRecommend) => recommendSituation(authApiClient, data),
  });
};
