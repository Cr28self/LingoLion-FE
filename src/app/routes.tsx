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
import { GlobalRouteErrorFallback } from "@/components/errors/global";

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
    errorElement: <GlobalRouteErrorFallback />,
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
