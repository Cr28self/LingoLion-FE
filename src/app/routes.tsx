import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingRoute from "./routes/landing";
import NotFoundRoute from "./routes/not-found";

import AppLayout from "@/components/layout/app-layout";
import DashboardRoute from "./routes/app/dashboard";
import SituationRoute from "./routes/app/situation-builder";
// import RegisterRoute from "./routes/auth/register";
import ConversationRoute from "./routes/app/conversation";

const GlobalRouteError = () => {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
};

// 원래는 lazy 컴포넌트 불러올때 Suspense로 감싸야함내부적으로 Suspense를 자동으로 처리하므로 <Suspense>를 수동으로 감쌀 필요가 없습니다.
// ! 페이지에서 발생하는 에러 --> react-route의 errorElement로 처리
// ! 컴포넌트 내부에서 발생하는 에러 --> ErrorBoundary로 처리
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <GlobalRouteError />,
    children: [
      {
        path: "",
        element: <LandingRoute />,
      },
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

  {
    path: "/dashboard",
    element: <DashboardRoute />,
  },
  {
    path: "/c/:conversationId",
    element: <ConversationRoute />,
  },
  {
    path: "/situation/new",
    element: <SituationRoute />,
  },
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
