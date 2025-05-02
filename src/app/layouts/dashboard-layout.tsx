import { History, LayoutDashboard, Settings } from 'lucide-react';
import DashboardSidebar from '@/app/widgets/dashboard-sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <DashboardSidebar
        links={[
          {
            to: '/app/overview',
            icon: <LayoutDashboard />,
            name: '대시보드',
          },
          // {
          //   to: '/app/explore-situations',
          //   icon: <Search />,
          //   name: '상황 탐색',
          // },
          // {
          //   to: '/app/create-situation',
          //   icon: <PlusCircle />,
          //   name: '상황 생성',
          // },
          // {
          //   to: '/app/my-situations',
          //   icon: <FolderKanban />,
          //   name: '내 상황 목록',
          // },
          {
            to: '/app/my-conversations',
            icon: <History />,
            name: '내 대화 목록',
          },
          {
            to: '/app/setting',
            icon: <Settings />,
            name: 'Settings',
          },
        ]}
      />

      {/* Main Content */}
      <main className="relative z-10 flex-1 overflow-y-auto">
        <div className="mx-auto mt-12 max-w-7xl p-8 md:mt-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
