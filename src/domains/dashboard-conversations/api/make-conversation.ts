import { useAuthenticatedApiClient } from '@/lib/auth/use-authenticated-api-client';
import { TMakeConversation } from '@/types/api';
import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';

export const makeConversation = async (
  apiClient: AxiosInstance,
  data: TMakeConversation
) => {
  const response = await apiClient.post('/conversations', data);
  return response.data;
};

export const useMakeConversation = () => {
  const authApi = useAuthenticatedApiClient();

  return useMutation({
    mutationFn: (data: TMakeConversation) => makeConversation(authApi, data),
  });
};
