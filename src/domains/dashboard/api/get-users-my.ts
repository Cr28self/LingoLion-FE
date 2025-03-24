import { useAuthApiClient } from "@/lib/auth/useAuthApiClient";
import { TGetUsersMyResponse } from "@/types/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export const getUsersMy = async (
  apiClient: AxiosInstance
): Promise<TGetUsersMyResponse> => {
  const response = await apiClient.get(`/users/my`);

  await new Promise((resolve) => setTimeout(resolve, 3000));
  return response.data;
};

export const useGetUsersMy = () => {
  const authApi = useAuthApiClient();

  return useSuspenseQuery({
    queryKey: ["user"],
    queryFn: () => getUsersMy(authApi),
  });
};
