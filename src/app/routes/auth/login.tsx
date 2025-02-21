import AuthLayout from "@/components/layout/auth-layout";
import LoginForm from "@/features/auth/components/login-form";
import { ErrorBoundary } from "react-error-boundary";

export const LoginRoute = () => {
  // onSuccess 리다이렉트 함수

  //

  // 헤더의 Authorization 에다가 : Basic "email:password" --> 인코딩한 문자열 ( 헤더에다가 담아서 보내줌 )  ---- 로그인할때
  // 회원가입할때는 body에다가 email, password, name 보내줌
  //  JWT 는   Bearer JWT토큰
  // 쿠키 값 원하는때 보내줄수 있는지 유무 알아보기

  return (
    <AuthLayout title="로그인">
      {/* 로그인 폼 */}

      <LoginForm />
    </AuthLayout>
  );
};
