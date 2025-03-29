import { useAuthApiClient } from "@/lib/auth/useAuthApiClient";
import { TMakeSituation } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosInstance } from "axios";

export const makeSituation = async (
  apiClient: AxiosInstance,
  data: TMakeSituation
) => {
  const response = await apiClient.post("/situations", data);
  return response.data;
};

export const useMakeSituation = () => {
  const authApi = useAuthApiClient();

  return useMutation({
    mutationFn: (data: TMakeSituation) => makeSituation(authApi, data),
  });
};
