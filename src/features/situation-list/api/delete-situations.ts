import { useAuthenticatedApiClient } from '@/lib/auth/use-authenticated-api-client';
import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';

export const deleteSituation = async (apiClient: AxiosInstance, id: number) => {
  const response = await apiClient.delete(`/situations/${id}`);
  return response.data;
};

export const useDeleteSituation = () => {
  const authApi = useAuthenticatedApiClient();

  return useMutation({
    mutationFn: (id: number) => deleteSituation(authApi, id),
  });
};
