import { useAuthStore } from '@/features/auth/store/use-auth-store.ts';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { loginFn } from '../api/login-api';
import { LoginErrorResponse } from '../types/error-types';

// ! 로그인 hook
const useLogin = ({
  onSuccessNavigate,
  setIsLoggingIn,
}: {
  onSuccessNavigate: () => void;
  setIsLoggingIn: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { updateAccessToken } = useAuthStore();

  const { mutate } = useMutation({
    mutationFn: loginFn,
    // 요청 직전에 isLoggingIn을 true로 설정
    onMutate: () => {
      setIsLoggingIn(true);
    },
    // 요청 성공 시
    onSuccess: (data) => {
      updateAccessToken(data.accessToken);
      toast.success('로그인 성공');
      onSuccessNavigate();
    },
    // 요청 실패 시
    onError: (error: AxiosError<LoginErrorResponse>) => {
      console.error(error.response?.data.message);
      toast.error('로그인 실패');
    },
    // 성공/실패와 관계없이 항상 호출
    onSettled: () => {
      setIsLoggingIn(false);
      // ↑ 이미 onSuccess, onError 모두에서 false로 설정했다면 중복 설정은 생략 가능
    },
  });

  return { mutate };
};

export default useLogin;
