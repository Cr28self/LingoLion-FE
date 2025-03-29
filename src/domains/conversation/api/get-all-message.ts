import { useAuthApiClient } from "@/lib/auth/useAuthApiClient";
import { TGetAllMessageResponse } from "@/types/api";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

// 순수 API 호출 함수
export const getAllMessage = async (
  apiClient: AxiosInstance,
  cursor: string | null,
  convId: string,
  limit: number
): Promise<TGetAllMessageResponse> => {
  const response = await apiClient.get(`/conversations/${convId}/message`, {
    params: {
      cursor,
      limit,
    },
  });
  return response.data;
};

export const useGetAllInfiniteMessage = (convId: string, limit: number) => {
  const authApiClient = useAuthApiClient();
  return useSuspenseInfiniteQuery<TGetAllMessageResponse>({
    queryKey: ["getAllMessage", convId],
    queryFn: ({ pageParam = null }) =>
      getAllMessage(authApiClient, pageParam as string | null, convId, limit),
    getNextPageParam: (lastPage) => {
      if (lastPage.pageInfo.hasNextPage) {
        return lastPage.pageInfo.endCursor;
      }
      return undefined;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    initialPageParam: null,
  });
};
