import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

const queryClient = new QueryClient();
function GlobalAppErrorFallback({ error }) {
  return (
    <div>
      <h2>앱에서 알 수 없는 오류가 발생했습니다!</h2>
      <p>{error.message}</p>
    </div>
  );
}

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary FallbackComponent={GlobalAppErrorFallback}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ErrorBoundary>
  );
};

export default AppProvider;
