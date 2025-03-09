import { TAllList } from "@/domains/situation-builder/reducer/types";
import { useAuthApiClient } from "@/lib/auth/useAuthApiClient";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export type TSituationsResponse = {
  data: (TAllList & { id: number })[];
  pageInfo: { hasNextPage: boolean; endCursor: string };
};

export const getSituations = async (
  apiClient: AxiosInstance,
  cursor: string | null
): Promise<TSituationsResponse> => {
  const response = await apiClient.get("/situations", {
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

export const useGetSituations = ({ cursor }: { cursor: string | null }) => {
  const authApiClient = useAuthApiClient();
  return useSuspenseQuery<TSituationsResponse>({
    queryFn: () => getSituations(authApiClient, cursor),
    queryKey: ["getSituations", cursor],
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
