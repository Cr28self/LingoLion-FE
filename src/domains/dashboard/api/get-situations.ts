import { useAuthApiClient } from "@/lib/auth/useAuthApiClient";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export const getSituations = async (apiClient: AxiosInstance) => {
  return apiClient.get("/situations", {
    params: {
      limit: 3,
    },
  });
};

export const getSituationsQueryOptions = () => {
  return queryOptions({
    queryKey: ["getSituations"],
    staleTime: Infinity,

    refetchOnWindowFocus: false,
  });
};

export const useGetSituations = () => {
  const authApiClient = useAuthApiClient();
  return useSuspenseQuery({
    queryFn: () => getSituations(authApiClient),
    ...getSituationsQueryOptions(),
  });
};
