import { useAuthApiClient } from "@/lib/auth/useAuthApiClient";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export const getAllConversations = async (apiClient: AxiosInstance) => {
  const response = await apiClient.get("/conversations");

  return response.data;
};

export const getAllConvQueryOptions = () => {
  return queryOptions({
    queryKey: ["getAllConversations"],
    staleTime: Infinity,

    refetchOnWindowFocus: false,
  });
};

export const useGetAllConversations = () => {
  const authApiClient = useAuthApiClient();
  return useSuspenseQuery({
    queryFn: () => getAllConversations(authApiClient),

    ...getAllConvQueryOptions(),
  });
};
