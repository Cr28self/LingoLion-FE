import React from "react";
import { ErrorBoundary } from "react-error-boundary";
type AuthLayoutProps = {
  title: string;
  children: React.ReactNode;
};
const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => {
  return (
    <div>
      <h2>⚠️ 오류 발생: {error.message}</h2>
      <button onClick={resetErrorBoundary}>다시 시도하기</button>
    </div>
  );
};

// ! 사용자 인증 페이지 레이아웃
const AuthLayout = ({ title, children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        {/* 제목 */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-orange-500">{title}</h1>
        </div>
        {/* ! ErrorBoundary는 렌더링 과정에서 발생하는 에러를 잡음, 
        컴포넌트가 다 그려지고 내부 로직에서 발생하는 에러는 try..catch로 에러를 잡아야함 */}
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          {children}
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default AuthLayout;
