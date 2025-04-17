import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingRoute from '../routes/landing';
import OverviewPage from '../routes/app/overview-page.tsx';
import SettingPage from '../routes/app/setting-page.tsx';
import MySituationsPage from '../routes/app/my-situations-page.tsx';
import MyConversationsPage from '../routes/app/my-conversations-page.tsx';
import ConversationPage from '../routes/app/conversation-page.tsx';
import PublicLayout from '@/entry/layout/PublicLayout';
import PrivateLayout from '@/entry/layout/PrivateLayout';
import { GlobalRouteErrorFallback } from '@/components/errors/global';
import { useMemo } from 'react';
import CreateSituationPage from '@/routes/app/create-situation-page.tsx';
import DashboardPage from '@/routes/app/test/dashboard-page';
import ExploreScenariosPage from '@/routes/app/test/explore-scenario-page';
import NewConversationSetupPage from '@/routes/app/test/new-conversation-page';
import MyScenariosPage from '@/routes/app/test/my-scenarios-page';
import HistoryListPage from '@/routes/app/test/history-list-page';
import TestAppLayout from '@/routes/app/test/test-app-layout';
import ExploreSituationsPage from '@/routes/app/explore-situations-page.tsx';

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
        { index: true, path: '', element: <OverviewPage /> },
        { path: 'overview', element: <OverviewPage /> },
        { path: 'explore-situations', element: <ExploreSituationsPage /> },
        { path: 'setting', element: <SettingPage /> },
        { path: 'my-situations', element: <MySituationsPage /> },
        { path: 'my-conversations', element: <MyConversationsPage /> },

        {
          path: 'conversation/:conversationId',
          element: <ConversationPage />,
        },

        {
          path: 'create-situation',
          element: <CreateSituationPage />,
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
