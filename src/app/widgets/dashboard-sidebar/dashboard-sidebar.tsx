import React, { useEffect } from 'react';
import { useSidebarStore } from '@/store/sidebar-store.ts';

import SidebarLink from './_internal/sidebar-link.tsx';
import SidebarUserInfo from './_internal/sidebar-user-info.tsx';
import { useLogout } from '@/features/auth/hooks/use-logout.ts';
import SidebarLogoutButton from '@/features/auth/components/button/sidebar-logout-button.tsx';
import { useGetUsersMy } from '@/features/user/api/get-users-my.ts';
import {
  DesktopToggleButton,
  MobileToggleButton,
} from './_internal/sidebar-toggle-button.tsx';
import { SkeletonUserProfile } from '@/app/widgets/dashboard-sidebar/_internal/skeleton-user-profile.tsx';
import { Button } from '@/components/ui/button.tsx';

type DashboardSidebarProps = {
  links: { to: string; icon: React.ReactNode; name: string }[];
};

const DashboardSidebar = ({ links }: DashboardSidebarProps) => {
  const { data: userData, isLoading, error } = useGetUsersMy();
  const { logout, isLoggingOut } = useLogout();
  const { isOpen, close, open } = useSidebarStore();

  // 화면 크기가 md 이하일 때 사이드바 자동으로 닫기
  useEffect(() => {
    const handleResize = () => {
      console.log('handleResize');
      if (window.innerWidth < 768) {
        close();
      } else {
        // 데스크톱에서는 기본적으로 열려있도록 설정
        open();
      }
    };

    // 초기 로드 시 체크
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [close, open]);

  return (
    <>
      {/* 모바일 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 md:hidden"
          onClick={close}
        />
      )}

      {/* 사이드바 */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-full flex-col border-r bg-card shadow-xl transition-all duration-300 ease-in-out md:relative ${isOpen ? 'w-64' : 'w-0 md:w-20'} ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} `}
      >
        <div className="flex h-16 items-center justify-between p-4">
          <div className="flex items-center overflow-hidden">
            <div className="mr-2 flex-shrink-0">
              <img
                src="/lingo-lion-logo-noBG.webp"
                alt="Lingo Lion"
                className="h-8 w-8"
              />
            </div>
            {isOpen && (
              <h2 className="truncate text-xl font-bold text-primary">
                Lingo Lion
              </h2>
            )}
          </div>
        </div>

        {/* 데스크톱에서 사이드바 토글 버튼 */}

        <DesktopToggleButton />

        <div
          className={`flex flex-1 flex-col overflow-y-auto py-4 ${isOpen ? 'px-4' : 'px-0'}`}
        >
          <Button className="mb-4 w-full bg-gradient-to-r from-orange-500 to-destructive py-6 text-lg font-bold text-white hover:from-orange-600 hover:to-red-700">
            대화 시작
          </Button>
          <nav className="flex-1 space-y-1">
            {links.map((link) => {
              const { icon, name, to } = link;
              return (
                <SidebarLink key={to} to={to} icon={icon}>
                  {name}
                </SidebarLink>
              );
            })}
          </nav>

          <div
            className={`mt-auto border-t border-border pt-4 ${
              isOpen ? '' : 'text-center'
            }`}
          >
            {isLoading ? (
              // 로딩 중이면 스켈레톤 UI 표시
              <SkeletonUserProfile /> // isOpen prop 추가 (스켈레톤도 상태따라 달라질 수 있으므로)
            ) : error ? (
              // 에러 발생 시 에러 메시지 또는 대체 UI 표시 (선택 사항)
              <div className="px-3 text-xs text-destructive">
                사용자 정보 로딩 실패
              </div>
            ) : userData ? (
              // 로딩 완료 및 데이터가 있으면 SidebarUserInfo 렌더링 (데이터 전달)
              <SidebarUserInfo userData={userData} /> // isOpen prop도 필요하면 전달
            ) : (
              // 로딩도 아니고 에러도 아닌데 데이터가 없는 경우 (예: 로그아웃 직후 등)
              // 필요에 따라 스켈레톤이나 다른 UI를 보여줄 수 있음
              <SkeletonUserProfile />
            )}

            {/* <SkeletonUserProfile /> */}

            <SidebarLogoutButton
              onLogout={logout}
              isLoggingOut={isLoggingOut}
            />

            <MobileToggleButton />
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
