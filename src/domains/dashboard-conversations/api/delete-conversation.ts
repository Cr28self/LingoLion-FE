import { useAuthenticatedApiClient } from "@/lib/auth/use-authenticated-api-client";
import { useMutation } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export const deleteConversation = async (
  apiClient: AxiosInstance,
  id: number
) => {
  const response = await apiClient.delete(`/conversations/${id}`);
  return response.data;
};

export const useDeleteConversation = () => {
  const authApi = useAuthenticatedApiClient();

  return useMutation({
    mutationFn: (id: number) => deleteConversation(authApi, id),
  });
};
