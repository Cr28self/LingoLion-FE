// ! 순수 함수
import { z } from "zod";
import { loginSchema, registerSchema } from "./schema";
import { apiClient } from "../api-client";

// ! 로그인 함수
export const loginFn = async ({
  email,
  password,
}: z.infer<typeof loginSchema>): Promise<{ accessToken: string }> => {
  // 헤더의 Authorization 에다가 : Basic "email:password" --> 인코딩한 문자열 ( 헤더에다가 담아서 보내줌 )  ---- 로그인할때
  const response = await apiClient.post(
    "/api/auth/login",
    {},
    {
      headers: {
        Authorization: `Basic ${btoa(`${email}:${password}`)}`,
      },
    }
  );

  return response.data;
};

// ! 회원가입 함수
export const registerFn = async ({
  email,
  password,
  name,
}: z.infer<typeof registerSchema>) => {
  const response = await apiClient.post("/auth/join", {
    email,
    password,
    name,
  });

  return response.data;
};
