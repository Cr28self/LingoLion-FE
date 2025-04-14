// src/components/layout/TestAppLayout.jsx
import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
// lucide-react 아이콘 임포트
import {
  LayoutDashboard,
  Search,
  PlusCircle,
  FolderKanban,
  History,
  UserCircle,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
} from 'lucide-react';

// 사용자 정보 (임시)
const user = {
  name: '지수',
  email: 'jisoo@email.com',
  avatar: null, // 아바타 이미지 URL 또는 null
};

function SidebarLink({ to, icon: Icon, children }) {
  return (
    <NavLink
      to={to}
      // activeClassName 대신 함수를 사용하여 클래스 동적 적용 (react-router-dom v6+)
      className={({ isActive }) =>
        `flex items-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-150 ${
          isActive
            ? 'bg-primary/10 text-primary' // 활성 상태 스타일
            : 'text-muted-foreground hover:bg-muted hover:text-foreground' // 비활성 및 호버 상태
        }`
      }
    >
      <Icon className="mr-3 h-5 w-5 flex-shrink-0" strokeWidth={2} />
      {children}
    </NavLink>
  );
}

function TestAppLayout() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // 사이드바 열림/닫힘 상태

  const handleLogout = () => {
    console.log('로그아웃 처리');
    // TODO: 실제 로그아웃 로직 (토큰 제거 등)
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-background">
      {/* 사이드바 */}
      <aside
        className={`flex flex-col border-r border-border bg-card transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'}`}
      >
        {/* 로고 및 토글 버튼 */}
        <div
          className={`flex h-16 items-center justify-between border-b border-border px-4 ${isSidebarOpen ? '' : 'justify-center'}`}
        >
          <Link
            to="/app/test"
            className={`text-xl font-bold text-primary ${isSidebarOpen ? '' : 'hidden'}`}
          >
            FluentAI
          </Link>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label={isSidebarOpen ? '사이드바 닫기' : '사이드바 열기'}
          >
            {isSidebarOpen ? (
              <PanelLeftClose className="h-5 w-5" />
            ) : (
              <PanelLeftOpen className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* 네비게이션 */}
        <nav className="flex-grow space-y-1 overflow-y-auto px-4 py-4 scrollbar-thin">
          <SidebarLink to="/app/test" icon={LayoutDashboard}>
            대시보드
          </SidebarLink>
          <SidebarLink to="/app/test/explore" icon={Search}>
            상황 탐색
          </SidebarLink>
          <SidebarLink to="/app/test/new-conversation" icon={PlusCircle}>
            새 상황 생성
          </SidebarLink>
          <SidebarLink to="/app/test/scenarios" icon={FolderKanban}>
            내 상황 목록
          </SidebarLink>
          <SidebarLink to="/app/test/history" icon={History}>
            대화 기록
          </SidebarLink>
        </nav>

        {/* 프로필 및 로그아웃 */}
        <div className="mt-auto border-t border-border p-4">
          <div
            className={`mb-3 flex items-center space-x-3 ${isSidebarOpen ? '' : 'justify-center'}`}
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="User Avatar"
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <UserCircle
                className="h-8 w-8 text-muted-foreground"
                strokeWidth={1.5}
              />
            )}
            <div className={isSidebarOpen ? 'text-sm' : 'hidden'}>
              <p className="font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            {/* 설정 버튼 (선택 사항) */}
            <button
              onClick={() => navigate('/app/profile')}
              className={`flex w-full items-center rounded-md px-3 py-2 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ${isSidebarOpen ? '' : 'justify-center'}`}
            >
              <Settings
                className={`h-5 w-5 ${isSidebarOpen ? 'mr-3' : ''}`}
                strokeWidth={2}
              />
              <span className={isSidebarOpen ? '' : 'hidden'}>설정</span>
            </button>
            <button
              onClick={handleLogout}
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              aria-label="로그아웃"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1 overflow-y-auto">
        {/* Outlet: 현재 라우트에 맞는 페이지 컴포넌트가 렌더링됨 */}
        <Outlet />
      </main>
    </div>
  );
}

export default TestAppLayout;
