import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Loading from '../../components/ui/loading.tsx';
import { useAuthStore } from '@/features/auth/store/use-auth-store.ts';

// ! 인증이 필요없는 페이지의 최상단 레이아웃
const PublicLayout = () => {
  const { isLoggedIn, isCheckingAuth } = useAuthStore();
  const location = useLocation();

  if (isCheckingAuth) {
    return <Loading />; // ✅ refreshToken이 완료될 때까지 UI 변경 X
  }

  if (isLoggedIn) return <Navigate to="/app" replace />;

  // 2. 로그아웃 상태이고, 현재 경로가 루트("/")인 경우 /auth/login으로 리다이렉트 (새로운 로직)
  // 이 조건은 isLoggedIn이 false일 때만 실행됩니다.
  if (location.pathname === '/') {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default PublicLayout;
