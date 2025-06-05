import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Link } from 'react-router-dom';
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

const HomeLogo = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 transition-opacity hover:opacity-90"
    >
      <div className="relative h-12 w-12">
        <img
          src="/lingo-lion-logo-noBG.webp"
          alt="Lingo Lion 로고"
          className="object-contain"
        />
      </div>
      <span className="text-2xl font-bold text-orange-500">Lingo Lion</span>
    </Link>
  );
};

// ! 사용자 인증 페이지 레이아웃
const AuthLayout = ({ title, children }: AuthLayoutProps) => {
  return (
    <div className="flex- flex min-h-screen bg-[#FFD5A0]">
      <div className="relative flex w-full flex-col justify-center gap-7 bg-background/90 p-8 shadow-md md:w-96">
        {/* 로고를 화면 기준으로 고정 */}

        <HomeLogo />

        <section>
          {/* 제목 */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{title}</h1>
          </div>

          {/* ! ErrorBoundary는 렌더링 과정에서 발생하는 에러를 잡음, 
        컴포넌트가 다 그려지고 내부 로직에서 발생하는 에러는 try..catch로 에러를 잡아야함 */}
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {children}
          </ErrorBoundary>
        </section>
      </div>

      {/* 브랜딩 이미지 섹션 */}
      <div className="hidden flex-1 items-end justify-center p-8 md:flex">
        <div className="relative aspect-square w-full max-w-2xl">
          <img
            src="/lingo-lion-branding-img.png"
            alt="교육 브랜딩 이미지"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
