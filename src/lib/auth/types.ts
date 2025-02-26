// 로그인 응답 에러 타입
export interface LoginErrorResponse {
  message: string;
  error?: string;
  statusCode: number;
}

// 회원가입 응답 에러 타입
export interface RegisterErrorResponse {
  message: string;
  statusCode: number;
}

export interface UnAuthorizedResponse {
  message: string;
  error?: string;
  statusCode: number;
}
