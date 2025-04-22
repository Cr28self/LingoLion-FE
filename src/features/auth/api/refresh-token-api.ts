import { apiClient } from '@/lib/api-client.ts';

export const refreshTokenFn = async (): Promise<{ accessToken: string }> => {
  const response = await apiClient.post(
    '/auth/refresh',
    {},
    { withCredentials: true }
  );

  return response.data;
};
