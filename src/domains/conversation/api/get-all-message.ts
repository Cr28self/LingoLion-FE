import { useAuthApiClient } from "@/lib/auth/useAuthApiClient";
import { TGetAllMessageResponse } from "@/types/api";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

// 순수 API 호출 함수
export const getAllMessage = async (
  apiClient: AxiosInstance,
  cursor: string | null,
  convId: string
): Promise<TGetAllMessageResponse> => {
  const response = await apiClient.get(`/conversations/${convId}/message`, {
    params: {
      cursor,
      limit: 6,
    },
  });
  return response.data;
};

export const useGetAllInfiniteMessage = (convId: string) => {
  const authApiClient = useAuthApiClient();
  return useSuspenseInfiniteQuery<TGetAllMessageResponse>({
    queryKey: ["getAllMessage", convId],
    queryFn: ({ pageParam = null }) =>
      getAllMessage(authApiClient, pageParam as string | null, convId),
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
