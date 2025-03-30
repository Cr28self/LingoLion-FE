import { useAuthenticatedApiClient } from "@/lib/auth/use-authenticated-api-client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export type TConversationResponse = {
  data: { id: number; title: string; icon: string; createdAt: Date }[];
  pageInfo: { hasNextPage: boolean; endCursor: string };
};

export const getAllConversations = async (
  apiClient: AxiosInstance,
  cursor: string | null
): Promise<TConversationResponse> => {
  const response = await apiClient.get("/conversations", {
    params: {
      cursor,
      limit: 6,
    },
  });

  return response.data;
};

// export const getAllConvQueryOptions = () => {
//   return queryOptions({
//     queryKey: ["getAllConversations"],
//     staleTime: Infinity,

//     refetchOnWindowFocus: false,
//   });
// };

export const useGetAllInfiniteConversations = () => {
  const authApiClient = useAuthenticatedApiClient();
  return useSuspenseInfiniteQuery<TConversationResponse>({
    queryKey: ["getAllConversations"],

    queryFn: ({ pageParam = null }) =>
      getAllConversations(authApiClient, pageParam as string | null),

    getNextPageParam: (lastPage) => {
      if (lastPage.pageInfo.hasNextPage) {
        //여기서 return한게 pageParam에 들어감
        return lastPage.pageInfo.endCursor;
      }

      return undefined;
    },

    staleTime: Infinity,
    refetchOnWindowFocus: false,
    initialPageParam: null,
  });
};
