import { useAuthenticatedApiClient } from '@/lib/auth/use-authenticated-api-client';
import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';

const getFeedback = async (apiClient: AxiosInstance) => {
  const response = await apiClient.get('/feedback/my');

  return response.data;
};

export default function useGetFeedback() {
  const authApiClient = useAuthenticatedApiClient();

  return useQuery({
    queryKey: ['getFeedback'],
    queryFn: () => getFeedback(authApiClient),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
