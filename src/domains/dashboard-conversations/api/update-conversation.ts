import { useAuthenticatedApiClient } from "@/lib/auth/use-authenticated-api-client";
import { useMutation } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

type UpdateConversationData = {
  title?: string;
  icon?: string;
};

export const updateConversation = async (
  apiClient: AxiosInstance,
  id: number,
  data: UpdateConversationData
) => {
  const response = await apiClient.patch(`/conversations/${id}`, data);
  return response.data;
};

export const useUpdateConversation = () => {
  const authApi = useAuthenticatedApiClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateConversationData }) =>
      updateConversation(authApi, id, data),
  });
};
