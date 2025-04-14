import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingRoute from '../routes/landing';

import AppLayout from '@/components/layout/app-layout';
import DashboardOverviewRoute from '../routes/app/dashboard/overview';
import DashboardSettingRoute from '../routes/app/dashboard/setting';
import DashboardSituationsRoute from '../routes/app/dashboard/situations';
import DashboardConversationsRoute from '../routes/app/dashboard/conversations';
import ConversationRoute from '../routes/app/conversation';
import PublicLayout from '@/components/layout/PublicLayout';
import PrivateLayout from '@/components/layout/PrivateLayout';
import { GlobalRouteErrorFallback } from '@/components/errors/global';
import { useMemo } from 'react';
import CreateSituationRoute from '@/routes/app/situation/create.tsx';
import DashboardPage from '@/routes/app/test/dashboard-page';
import ExploreScenariosPage from '@/routes/app/test/explore-scenario-page';
import NewConversationSetupPage from '@/routes/app/test/new-conversation-page';
import MyScenariosPage from '@/routes/app/test/my-scenarios-page';
import HistoryListPage from '@/routes/app/test/history-list-page';
import TestAppLayout from '@/routes/app/test/test-app-layout';

// 원래는 lazy 컴포넌트 불러올때 Suspense로 감싸야함내부적으로 Suspense를 자동으로 처리하므로 <Suspense>를 수동으로 감쌀 필요가 없습니다.
// ! 페이지에서 발생하는 에러 --> react-route의 errorElement로 처리
// ! 컴포넌트 내부에서 발생하는 에러 --> ErrorBoundary로 처리
export const createAppRouter = () =>
  createBrowserRouter([
    // ===========================
    // !1) Public Routes (비로그인 전용)
    // ===========================
    {
      path: '/',
      element: <PublicLayout />,
      errorElement: <GlobalRouteErrorFallback />,
      children: [
        {
          path: '',
          element: <AppLayout />, // 공통 레이아웃 (헤더/푸터 포함)
          children: [
            { index: true, element: <LandingRoute /> }, // 기본 랜딩 페이지
          ],
        },
        {
          path: '/auth/register',

          lazy: async () => {
            const { RegisterRoute } = await import('../routes/auth/register');
            return { Component: RegisterRoute };
          },
        },
        {
          path: '/auth/login',
          errorElement: <GlobalRouteErrorFallback />,
          lazy: async () => {
            const { LoginRoute } = await import('../routes/auth/login');
            return { Component: LoginRoute };
          },
        },
      ],
    },

    // ===========================
    // !2) Private Routes (로그인 사용자)
    // ===========================
    {
      path: '/app',
      element: <PrivateLayout />,
      errorElement: <GlobalRouteErrorFallback />,
      children: [
        {
          path: 'dashboard',

          children: [
            { path: 'overview', element: <DashboardOverviewRoute /> },
            { path: 'setting', element: <DashboardSettingRoute /> },
            { path: 'situations', element: <DashboardSituationsRoute /> },
            { path: 'conversations', element: <DashboardConversationsRoute /> },
            { index: true, path: '', element: <DashboardOverviewRoute /> },
          ],
        },
        {
          path: 'conv/:conversationId/:conversationTitle',
          element: <ConversationRoute />,
        },

        {
          path: 'situation/create',
          element: <CreateSituationRoute />,
        },
        {
          path: 'test',
          element: <TestAppLayout />,

          children: [
            { path: 'explore', element: <ExploreScenariosPage /> },
            { path: 'new-conversation', element: <NewConversationSetupPage /> },
            { path: 'scenarios', element: <MyScenariosPage /> },
            { path: 'history', element: <HistoryListPage /> },

            { index: true, path: '', element: <DashboardPage /> },
          ],
        },
      ],
    },

    // ===========================
    // 3) 기타
    // ===========================
    {
      path: '*',
      lazy: async () => {
        const { NotFoundRoute } = await import('../routes/not-found');
        return { Component: NotFoundRoute };
      },
    },
  ]);

const AppRouter = () => {
  const router = useMemo(() => createAppRouter(), []);
  return <RouterProvider router={router} />;
};

export default AppRouter;
