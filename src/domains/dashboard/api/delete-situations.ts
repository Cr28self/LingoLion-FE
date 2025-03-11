import { useAuthApiClient } from "@/lib/auth/useAuthApiClient";
import { useMutation } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export const deleteSituation = async (apiClient: AxiosInstance, id: number) => {
  const response = await apiClient.delete(`/situations/${id}`);
  return response.data;
};

export const useDeleteSituation = () => {
  const authApi = useAuthApiClient();

  return useMutation({
    mutationFn: (id: number) => deleteSituation(authApi, id),
  });
};
