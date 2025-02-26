import { AuthProvider } from "@/lib/auth/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

const queryClient = new QueryClient();
function GlobalAppErrorFallback({ error }) {
  const isDev = process.env.NODE_ENV === 'development';
  return (
    <div className="error-container">
      <h2>죄송합니다. 문제가 발생했습니다.</h2>
      <p>잠시 후 다시 시도해주세요.</p>
      {isDev && <p className="error-details">{error.message}</p>}
      <button onClick={() => window.location.reload()}>
        새로고침
      </button>
    </div>
  );
}

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary FallbackComponent={GlobalAppErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default AppProvider;
