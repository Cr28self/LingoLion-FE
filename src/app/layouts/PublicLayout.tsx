import { Navigate, Outlet } from 'react-router-dom';
import Loading from '../../components/ui/loading.tsx';
import { useAuthStore } from '@/features/auth/store/use-auth-store.ts';

// ! 인증이 필요없는 페이지의 최상단 레이아웃
const PublicLayout = () => {
  const { isLoggedIn, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return <Loading />; // ✅ refreshToken이 완료될 때까지 UI 변경 X
  }

  if (isLoggedIn) return <Navigate to="/app" replace />;
  return <Outlet />;
};

export default PublicLayout;
