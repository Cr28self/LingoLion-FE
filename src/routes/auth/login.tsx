import AuthLayout from '@/components/layout/auth-layout';
import LoginForm from '@/domains/auth/components/login-form';
import { useNavigate } from 'react-router-dom';

export const LoginRoute = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout title="로그인">
      {/* 로그인 폼 */}

      <LoginForm onSuccessNavigate={() => navigate('/app/dashboard')} />
    </AuthLayout>
  );
};
