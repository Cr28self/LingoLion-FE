import { useAuthenticatedApiClient } from "@/lib/auth/use-authenticated-api-client";
import { TGetUsersMyResponse } from "@/types/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export const getUsersMy = async (
  apiClient: AxiosInstance
): Promise<TGetUsersMyResponse> => {
  const response = await apiClient.get(`/users/my`);

  return response.data;
};

export const useGetUsersMy = () => {
  const authApi = useAuthenticatedApiClient();

  return useSuspenseQuery({
    queryKey: ["usersMy"],
    queryFn: () => getUsersMy(authApi),
    staleTime: Infinity,
  });
};
