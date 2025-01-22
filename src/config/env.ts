import { z } from "zod";

// 환경 변수 생성 및 유효성 검사 함수
const createEnv = () => {
  // Zod를 사용한 환경 변수 스키마 정의
  const EnvSchema = z.object({
    API_URL: z.string(), // 필수 API URL 환경 변수
  });

  // Vite 환경 변수 처리 및 변환
  const envVar = Object.entries(import.meta.env).reduce<Record<string, string>>(
    (acc, cur) => {
      const [key, value] = cur;

      // Vite 접두사(VITE_APP_)가 있는 경우 제거
      if (key.startsWith("VITE_APP_")) {
        acc[key.replace("VITE_APP_", "")] = value;
      } else {
        acc[key] = value;
      }

      return acc;
    },
    {}
  );

  // 환경 변수 유효성 검사 실행
  const parsedEnv = EnvSchema.safeParse(envVar);

  // 유효성 검사 실패 시 에러 처리
  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.
The following variables are missing or invalid:
${Object.entries(parsedEnv.error.flatten().fieldErrors)
  .map(([k, v]) => `- ${k}: ${v}`)
  .join("\n")}
`
    );
  }

  // 유효성 검사 통과 시 파싱된 환경 변수 반환
  return parsedEnv.data;
};

// 환경 변수 객체 export
export const env = createEnv();
