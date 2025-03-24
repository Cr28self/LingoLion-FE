import { useAuthApiClient } from "@/lib/auth/useAuthApiClient";
import { TGetUsersMyResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export const getUsersMy = async (
  apiClient: AxiosInstance
): Promise<TGetUsersMyResponse> => {
  const response = await apiClient.get(`/users/my`);
  return response.data;
};

export const useGetUsersMy = () => {
  const authApi = useAuthApiClient();

  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUsersMy(authApi),
  });
};
