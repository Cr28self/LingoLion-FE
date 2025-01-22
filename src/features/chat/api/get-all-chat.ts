import { apiClient } from "@/lib/api-client";
import { ChatList } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

// 순수 API 호출 함수
export const getAllChat = (): Promise<{ data: ChatList[] }> => {
  return apiClient.get("/chat");
};

// 쿼리 옵션
export const getAllChatQueryOptions = () => {};

// 최종 커스텀 훅
export const useGetAllChat = () => {
  return useQuery({
    queryKey: ["getAllChat"],
    queryFn: getAllChat,
  });
};
