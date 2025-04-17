// 로그인 응답 에러 타입
export type LoginErrorResponse = {
  message: string;
  error?: string;
  statusCode: number;
};

// 회원가입 응답 에러 타입
export type RegisterErrorResponse = {
  message: string;
  statusCode: number;
};
