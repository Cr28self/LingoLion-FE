import { useAuthenticatedApiClient } from '@/lib/auth/use-authenticated-api-client.tsx';
import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';
import { TGetUsersMyResponse } from '@/entities/user/types.ts';

export const getUsersMy = async (
  apiClient: AxiosInstance
): Promise<TGetUsersMyResponse> => {
  const response = await apiClient.get(`/users/my`);

  return response.data;
};

export const useGetUsersMy = () => {
  const authApi = useAuthenticatedApiClient();

  return useQuery({
    queryKey: ['usersMy'],
    queryFn: () => getUsersMy(authApi),
    staleTime: Infinity,
  });
};
