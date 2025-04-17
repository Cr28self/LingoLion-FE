import { useAuthenticatedApiClient } from '@/lib/auth/use-authenticated-api-client';
import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';
import { TSituation } from '@/entities/situation/types.ts';

export const makeSituation = async (
  apiClient: AxiosInstance,
  data: TSituation
) => {
  const response = await apiClient.post('/situations', data);
  return response.data;
};

export const useMakeSituation = () => {
  const authApi = useAuthenticatedApiClient();

  return useMutation({
    mutationFn: (data: TSituation) => makeSituation(authApi, data),
  });
};
