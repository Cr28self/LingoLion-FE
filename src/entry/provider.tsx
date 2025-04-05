import * as React from 'react';
import { AuthProvider } from '@/lib/auth/auth-provider';
import { queryConfig } from '@/lib/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'sonner';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GlobalAppErrorFallback } from '@/components/errors/global';
import { GoogleOAuthProvider } from '@react-oauth/google';

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // ! useState는 초기값을 함수로 전달하면, 해당 함수의 실행 결과를 상태의 초기값으로 설정합니다.
  // ! QueryClient는 비교적 무거운 객체이므로, 불필요한 객체 생성을 방지하기 위해 콜백 함수 (lazy initializer)를 사용합니다.
  const [queryClient] = React.useState(
    () => new QueryClient({ defaultOptions: queryConfig })
  );

  return (
    <ErrorBoundary FallbackComponent={GlobalAppErrorFallback}>
      <QueryClientProvider client={queryClient}>
        {import.meta.env.DEV && <ReactQueryDevtools />}

        <GoogleOAuthProvider clientId={'DUMMY_CLIENT_ID_FOR_UI_ONLY'}>
          <AuthProvider>{children}</AuthProvider>
        </GoogleOAuthProvider>

        <Toaster />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default AppProvider;
