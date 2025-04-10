import { useAuthenticatedApiClient } from '@/lib/auth/use-authenticated-api-client';
import { TSituation } from '@/types/situation';
import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';

type TGetConversationInfoResponse = {
  id: string;
  title: string;
  situation: TSituation;
  requests?: string;
  level?: string;
};

// 순수 API 호출 함수
const getConversationInfo = async (
  apiClient: AxiosInstance,
  convId: string
): Promise<TGetConversationInfoResponse> => {
  const response = await apiClient.get(`/conversations/${convId}`);
  return response.data;
};

export default function useGetConversationInfo(convId: string) {
  const authApiClient = useAuthenticatedApiClient();
  return useQuery({
    queryKey: ['getConversationInfo', convId],
    queryFn: () => getConversationInfo(authApiClient, convId),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
