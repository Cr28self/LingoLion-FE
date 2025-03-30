import { apiClient } from "../api-client";
import { AxiosInstance } from "axios";

// ! 로그아웃 함수
export const logoutFn = async (apiClient: AxiosInstance): Promise<void> => {
  const response = await apiClient.post(
    "/auth/logout",
    {},
    { withCredentials: true }
  );
  return response.data;
};

export const refreshTokenFn = async (): Promise<{ accessToken: string }> => {
  const response = await apiClient.post(
    "/auth/refresh",
    {},
    { withCredentials: true }
  );

  return response.data;
};
