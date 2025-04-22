// ! 로그아웃 함수
import { AxiosInstance } from 'axios';

export const logoutFn = async (apiClient: AxiosInstance): Promise<void> => {
  const response = await apiClient.post(
    '/auth/logout',
    {},
    { withCredentials: true }
  );
  return response.data;
};
