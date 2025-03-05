import { AlertCircle, ArrowLeft, RotateCcw } from "lucide-react";
import { useNavigate, useRouteError } from "react-router-dom";
import { Button } from "../ui/button";

export const GlobalRouteErrorFallback = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  const isDev = process.env.NODE_ENV === "development";

  // Extract error message if available
  const errorMessage =
    error instanceof Error ? error.message : "An unexpected error occurred";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="mx-auto max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <div className="rounded-full bg-destructive/10 p-4">
            <AlertCircle className="h-10 w-10 text-destructive" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-nowrap">
            죄송합니다. 문제가 발생했습니다.
          </h1>
          {isDev && <p className="error-details">{errorMessage}</p>}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button
            variant="default"
            onClick={() => window.location.reload()}
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            새로 고침
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            뒤로 가기
          </Button>
        </div>
      </div>
    </div>
  );
};

export const GlobalAppErrorFallback = ({ error }) => {
  console.log("GGB");
  const isDev = process.env.NODE_ENV === "development";
  return (
    <div className="error-container">
      <h2>죄송합니다. 문제가 발생했습니다.</h2>
      <p>잠시 후 다시 시도해주세요.</p>
      {isDev && <p className="error-details">{error.message}</p>}
      <button onClick={() => window.location.reload()}>새로고침</button>
    </div>
  );
};
