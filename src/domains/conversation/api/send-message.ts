import { useAuthApiClient } from "@/lib/auth/useAuthApiClient";
import { TSendMessage } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export const sendMessage = async (
  apiClient: AxiosInstance,
  { content, convId }: TSendMessage
) => {
  const response = await apiClient.post(`/conversations/${convId}/message`, {
    role: "user",
    content,
  });

  return response.data;
};

export const useSendMessage = () => {
  const authApi = useAuthApiClient();
  return useMutation({
    mutationFn: ({ content, convId }: TSendMessage) =>
      sendMessage(authApi, { convId, content }),
  });
};
