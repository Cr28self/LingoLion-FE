import { z } from "zod";

// ! 로그인 스키마
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "이메일을 입력해주세요." })
    .email({ message: "유효한 이메일 주소를 입력해주세요." }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." }),
});

// ! 회원가입 스키마
export const registerSchema = z
  .object({
    email: z.string().email("유효한 이메일을 입력해주세요."),
    password: z
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/,
        "비밀번호는 대문자, 소문자, 숫자 및 특수 문자를 포함해야 합니다."
      ),
    confirmPassword: z.string(),
    name: z.string().min(2, "이름은 최소 2자 이상이어야 합니다."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });

//     "비밀번호는 최소 8자 이상이며, 대문자, 소문자, 숫자 또는 특수 문자를 포함해야 합니다."
