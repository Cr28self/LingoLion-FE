import { z } from "zod";

// ! 로그인 스키마
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// ! 회원가입 스키마
export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
});
