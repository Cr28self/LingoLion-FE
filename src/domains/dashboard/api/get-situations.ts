import { TAllList } from "@/domains/situation-builder/reducer/types";
import { useAuthApiClient } from "@/lib/auth/useAuthApiClient";
import { TSituationMode } from "@/types/api";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export type TSituationsResponse = {
  data: (TAllList & { id: number })[];
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

export const getSituationsQueryOptions = (cursor: string | null) => {
  return queryOptions({
    queryKey: ["getSituations", cursor],
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

export const useGetSituations = ({
  cursor,
  mode,
}: {
  cursor: string | null;
  mode: TSituationMode;
}) => {
  const authApiClient = useAuthApiClient();

  return useSuspenseQuery<TSituationsResponse>({
    queryKey: ["getSituations", mode, cursor],
    queryFn: () => getSituations(authApiClient, cursor, mode),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
