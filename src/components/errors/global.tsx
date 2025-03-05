import { AlertCircle, ArrowLeft, Home } from "lucide-react";
import { useNavigate, useRouteError } from "react-router-dom";
import { Button } from "../ui/button";

export const GlobalRouteErrorFallback = () => {
  const navigate = useNavigate();
  const error = useRouteError();

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
          <h1 className="text-4xl font-bold tracking-tight">Error</h1>
          <p className="text-muted-foreground">{errorMessage}</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button
            variant="default"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <Home className="h-4 w-4" />
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
};
