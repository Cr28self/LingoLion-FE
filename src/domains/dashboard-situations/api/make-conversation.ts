import { useAuthenticatedApiClient } from '@/lib/auth/use-authenticated-api-client.tsx';
import { useMutation } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';

type TMakeConversation = {
  title: string;
  icon?: string;
  situationId: number;
  metaData?: {
    difficulty: '상' | '중' | '하';
    request: string;
  };
};

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
