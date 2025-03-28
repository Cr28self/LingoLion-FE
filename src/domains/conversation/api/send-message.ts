import { useAuthApiClient } from "@/lib/auth/useAuthApiClient";
import { TGetAllMessageResponse, TSendMessage } from "@/types/api";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export const sendMessage = async (
  apiClient: AxiosInstance,
  { content, convId }: TSendMessage
) => {
  const response = await apiClient.post(
    `/conversations/${convId}/message/stream`,
    {
      role: "user",
      content,
    }
  );

  return response.data;
};

export const useSendMessage = () => {
  const authApi = useAuthApiClient();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ content, convId }: TSendMessage) =>
      sendMessage(authApi, { convId, content }),

    onMutate: async ({ content, convId }: TSendMessage) => {
      // 1️⃣ 기존 쿼리 중단 (서버 데이터를 가져오는 요청을 취소)

      // 2️⃣ 현재 메시지 목록 캐시 가져오기 (실패 시 롤백을 위해 저장)
      const previousMessages = queryClient.getQueryData([
        "getAllMessage",
        convId,
      ]);

      // 3️⃣ 낙관적 업데이트: 새 메시지를 캐시에 추가하여 UI 즉시 반영
      const tempData = {
        id: 99,
        sender: "user",
        content,
        createAt: new Date().toISOString(),
      };
      queryClient.setQueryData(
        ["getAllMessage", convId],
        (old: InfiniteData<TGetAllMessageResponse>) => {
          const newData = {
            pageParams: [null],
            pages: [
              {
                data: [tempData, ...old.pages[0].data.slice(0, -1)],
                pageInfo: { ...old.pages[0].pageInfo },
              },
            ],
          };
          return newData;
        }
      );

      // 4️⃣ 실패했을 경우 롤백할 수 있도록 현재 상태 반환
      return { previousMessages };
    },
  });
};
