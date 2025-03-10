import { useAuthApiClient } from "@/lib/auth/useAuthApiClient";
import { TGetAllMessage, TGetAllMessageResponse } from "@/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

// 순수 API 호출 함수
export const getAllMessage = async (
  apiClient: AxiosInstance,
  { convId, cursor }: TGetAllMessage
): Promise<TGetAllMessageResponse> => {
  const response = await apiClient.get(`/conversations/${convId}/message`, {
    params: {
      cursor,
      limit: 10,
    },
  });
  return response.data;
};

// 쿼리 옵션
export const getAllMessageQueryOptions = ({ convId }: TGetAllMessage) => {
  return queryOptions<TGetAllMessageResponse>({
    queryKey: ["getAllMessage", convId],
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
// 최종 커스텀 훅
export const useGetAllMessage = ({ convId, cursor }: TGetAllMessage) => {
  const authApiClient = useAuthApiClient();
  return useQuery<TGetAllMessageResponse>({
    queryFn: () => getAllMessage(authApiClient, { convId, cursor }),
    ...getAllMessageQueryOptions({ convId, cursor }),
  });
};
