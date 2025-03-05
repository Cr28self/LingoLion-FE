import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
  useRouteError,
} from "react-router-dom";
import LandingRoute from "./routes/landing";
import NotFoundRoute from "./routes/not-found";

import AppLayout from "@/components/layout/app-layout";
import DashboardRoute from "./routes/app/dashboard";
import SituationRoute from "./routes/app/situation-builder";
// import RegisterRoute from "./routes/auth/register";
import ConversationRoute from "./routes/app/conversation";
import PublicLayout from "@/components/layout/PublicLayout";
import PrivateLayout from "@/components/layout/PrivateLayout";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const GlobalRouteError = () => {
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

// 원래는 lazy 컴포넌트 불러올때 Suspense로 감싸야함내부적으로 Suspense를 자동으로 처리하므로 <Suspense>를 수동으로 감쌀 필요가 없습니다.
// ! 페이지에서 발생하는 에러 --> react-route의 errorElement로 처리
// ! 컴포넌트 내부에서 발생하는 에러 --> ErrorBoundary로 처리
const router = createBrowserRouter([
  // ===========================
  // !1) Public Routes (비로그인 전용)
  // ===========================
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <GlobalRouteError />,
    children: [
      {
        path: "",
        element: <AppLayout />, // 공통 레이아웃 (헤더/푸터 포함)
        children: [
          { index: true, element: <LandingRoute /> }, // 기본 랜딩 페이지
        ],
      },
      {
        path: "/auth/register",

        lazy: async () => {
          const { RegisterRoute } = await import("./routes/auth/register");
          return { Component: RegisterRoute };
        },
      },
      {
        path: "/auth/login",
        errorElement: <GlobalRouteError />,
        lazy: async () => {
          const { LoginRoute } = await import("./routes/auth/login");
          return { Component: LoginRoute };
        },
      },
    ],
  },

  // ===========================
  // !2) Private Routes (로그인 사용자)
  // ===========================
  {
    path: "/app",
    element: <PrivateLayout />,
    errorElement: <GlobalRouteError />,
    children: [
      {
        path: "dashboard",
        element: <DashboardRoute />,
      },
      {
        path: "c/:conversationId",
        element: <ConversationRoute />,
      },
      {
        path: "situation/new",
        element: <SituationRoute />,
      },
      // {
      //   path: "/situation/new",
      //   element: <SituationRoute />,
      // },
    ],
  },

  // ===========================
  // 3) 기타
  // ===========================
  {
    path: "*",
    element: <NotFoundRoute />,
  },
]);

const AppRouter = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AppRouter;
