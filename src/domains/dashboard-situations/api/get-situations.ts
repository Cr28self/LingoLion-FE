import { TAllList } from "@/domains/situation-create/reducer/types";
import { useAuthApiClient } from "@/lib/auth/useAuthApiClient";
import { TSituationMode } from "@/types/api";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export type TSituationsResponse = {
  data: (TAllList & { id: number; createdAt: Date })[];
  pageInfo: { hasNextPage: boolean; endCursor: string };
};

// 1) 통합된 함수
export const getSituations = async (
  apiClient: AxiosInstance,
  cursor: string | null,
  mode: TSituationMode
): Promise<TSituationsResponse> => {
  // mode에 따라 요청할 API 엔드포인트만 다름
  const endpoint = mode === "all" ? "/situations" : "/situations/my";

  const response = await apiClient.get(endpoint, {
    params: {
      cursor,
      limit: 6,
    },
  });

  return response.data;
};

export const useGetInfiniteSituations = (mode: TSituationMode) => {
  const authApiClient = useAuthApiClient();

  return useSuspenseInfiniteQuery<TSituationsResponse>({
    queryKey: ["getSituationsInfinite", mode],
    // ⬇ 여기서 pageParam 기본값을 null로 두고, getSituations에 전달 ( pageParam으로 설정해야함 )
    queryFn: ({ pageParam = null }) =>
      getSituations(authApiClient, pageParam as string | null, mode),
    // ⬇ 마지막 페이지(lastPage) 정보를 바탕으로, 다음 페이지의 cursor를 반환
    // lastPage는 이전에 queryFn이 반환한 데이터
    getNextPageParam: (lastPage) => {
      if (lastPage.pageInfo.hasNextPage) {
        // 여기서 return한게 pageParam으로 들어감
        return lastPage.pageInfo.endCursor;
      }
      return undefined; // undefined를 반환하면 더 이상 요청하지 않음
    },

    staleTime: Infinity,
    refetchOnWindowFocus: false,
    initialPageParam: null, // ✨ 여기에 추가
  });
};
