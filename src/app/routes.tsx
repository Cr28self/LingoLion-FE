import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingRoute from "./routes/landing";
import LoginRoute from "./routes/auth/login";
import NotFoundRoute from "./routes/not-found";
import ChatRoute from "./routes/app/chat";
import AppLayout from "@/components/layout/app-layout";
import DashboardRoute from "./routes/app/dashboard";
import SituationRoute from "./routes/app/situation-builder";
import RegisterRoute from "./routes/auth/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <LandingRoute />,
      },
    ],
  },
  {
    path: "/auth/login",
    element: <LoginRoute />,
  },
  {
    path: "/auth/register",
    element: <RegisterRoute />,
  },
  {
    path: "/dashboard",
    element: <DashboardRoute />,
  },
  {
    path: "/c/:chatId",
    element: <ChatRoute />,
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
  return <RouterProvider router={router} />;
};

export default AppRouter;
