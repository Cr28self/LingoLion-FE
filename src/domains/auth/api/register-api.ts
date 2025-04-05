import { apiClient } from '@/lib/api-client';
import { TRegisterSchema } from '../schema/register-schema';

// ! 회원가입 함수
export const registerFn = async ({
  email,
  password,
  name,
}: Omit<TRegisterSchema, 'confirmPassword'>): Promise<string> => {
  const response = await apiClient.post('/auth/join', {
    email,
    password,
    name,
  });

  return response.data;
};
