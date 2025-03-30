import { useAuthenticatedApiClient } from "@/lib/auth/use-authenticated-api-client";
import { useMutation } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { TAllList } from "@/domains/situation-create/reducer/types";

export const updateSituation = async (
  apiClient: AxiosInstance,
  id: number,
  data: Partial<TAllList>
) => {
  const response = await apiClient.patch(`/situations/${id}`, data);
  return response.data;
};

export const useUpdateSituation = () => {
  const authApi = useAuthenticatedApiClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<TAllList> }) =>
      updateSituation(authApi, id, data),
  });
};
