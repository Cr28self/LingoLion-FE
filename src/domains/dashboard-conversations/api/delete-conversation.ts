import { useAuthApiClient } from "@/lib/auth/useAuthApiClient";
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
  const authApi = useAuthApiClient();

  return useMutation({
    mutationFn: (id: number) => deleteConversation(authApi, id),
  });
};
