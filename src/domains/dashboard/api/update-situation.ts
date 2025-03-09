import { useAuthApiClient } from "@/lib/auth/useAuthApiClient";
import { useMutation } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { TAllList } from "@/domains/situation-builder/reducer/types";

export const updateSituation = async (
  apiClient: AxiosInstance,
  id: number,
  data: Partial<TAllList>
) => {
  const response = await apiClient.patch(`/situations/${id}`, data);
  return response.data;
};

export const useUpdateSituation = () => {
  const authApi = useAuthApiClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<TAllList> }) =>
      updateSituation(authApi, id, data),
  });
};
