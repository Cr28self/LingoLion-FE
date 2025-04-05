import { apiClient } from '@/lib/api-client';
import { TLoginSchema } from '../schema/login-schema';

// ! 로그인 함수
export const loginFn = async ({
  email,
  password,
}: TLoginSchema): Promise<{ accessToken: string }> => {
  // 헤더의 Authorization 에다가 : Basic "email:password" --> 인코딩한 문자열 ( 헤더에다가 담아서 보내줌 )  ---- 로그인할때
  const response = await apiClient.post(
    '/auth/login',
    {},
    {
      headers: {
        Authorization: `Basic ${btoa(`${email}:${password}`)}`,
      },
    }
  );

  return response.data;
};
