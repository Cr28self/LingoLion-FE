import { useAuthApiClient } from "@/lib/auth/useAuthApiClient";
import { TGetAllMessage } from "@/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export type GetAllMessageResponse = {
  data: {
    createdAt: string;
    id: number;
    sender: "assistant" | "user";
    content: string;
  }[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string;
  };
};

// 순수 API 호출 함수
export const getAllMessage = async (
  apiClient: AxiosInstance,
  { convId, cursor }: TGetAllMessage
): Promise<GetAllMessageResponse> => {
  const response = await apiClient.get(`/conversations/${convId}/message`, {
    params: {
      cursor,
      limit: 10,
    },
  });
  return response.data;
};

// 쿼리 옵션
export const getAllMessageQueryOptions = () => {
  return queryOptions<GetAllMessageResponse>({
    queryKey: ["getAllMessage"],
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
// 최종 커스텀 훅
export const useGetAllMessage = ({ convId, cursor }: TGetAllMessage) => {
  const authApiClient = useAuthApiClient();
  return useQuery<GetAllMessageResponse>({
    queryFn: () => getAllMessage(authApiClient, { convId, cursor }),
    ...getAllMessageQueryOptions(),
  });
};
