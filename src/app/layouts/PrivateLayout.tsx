import { Navigate, Outlet } from 'react-router-dom';
import Loading from '../../components/ui/loading.tsx';
import { useAuthStore } from '@/lib/auth/use-auth-store.ts';

// ! 인증이 필요한 페이지의 최상단 레이아웃
const PrivateLayout = () => {
  const { isLoggedIn, isCheckingAuth } = useAuthStore();

  // 아직 갱신이 끝나지 않았다면, "로딩 중" 상태만 표시하고 끝낸다.
  if (isCheckingAuth) {
    return <Loading />;
  }

  // 갱신이 끝났는데 인증에 실패했다면
  if (!isLoggedIn) {
    return <Navigate to="/auth/login" replace />;
  }

  // 인증 성공이 확정이면 해당 라우트를 렌더링
  return <Outlet />;
};

export default PrivateLayout;
