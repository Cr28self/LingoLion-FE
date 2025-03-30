import { useAuthenticatedApiClient } from "@/lib/auth/use-authenticated-api-client";
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
  const authApi = useAuthenticatedApiClient();

  return useMutation({
    mutationFn: (data: TMakeSituation) => makeSituation(authApi, data),
  });
};
