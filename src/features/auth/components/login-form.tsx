import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useState } from 'react';
import SubmitButton from './button/submit-button.tsx';
import useLogin from '../hooks/use-login';
import { loginSchema, TLoginSchema } from '../schema/login-schema';
import CustomGoogleLoginButton from './button/custom-google-login-button.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Loader2 } from 'lucide-react';

// login-form.tsx 상단 또는 별도의 설정 파일
const TEST_USER_EMAIL = 'testuser@example.com'; // 실제 테스트 계정 이메일로 변경
const TEST_USER_PASSWORD = '!Qwerty1234'; // 실제 테스트 계정 비밀번호로 변경

type LoginFormProps = {
  onSuccessNavigate: () => void;
};

export default function LoginForm({ onSuccessNavigate }: LoginFormProps) {
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  // isGoogleLoggingIn: 구글 로그인 시 사용 (CustomGoogleLoginButton과 상태 공유 필요)
  const [isGoogleLoggingIn] = useState<boolean>(false);

  const { mutate: login } = useLogin({ onSuccessNavigate, setIsLoggingIn });

  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = ({ email, password }: TLoginSchema) => {
    login({ email, password });
  };

  // 테스트 계정으로 로그인 핸들러
  const handleTestLogin = () => {
    // 만약 useLogin 훅이 뮤테이션 시작 시 setIsLoggingIn(true)를 호출하지 않는다면, 여기서 직접 호출합니다.
    if (!isLoggingIn) setIsLoggingIn(true);
    login({ email: TEST_USER_EMAIL, password: TEST_USER_PASSWORD });
  };

  // 어떤 형태의 로그인이든 진행 중인지 확인하는 플래그
  const anyLoginInProgress = isLoggingIn || isGoogleLoggingIn;

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input
                    placeholder="abcde@example.com"
                    type="email"
                    className="h-10"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Password"
                    type="password"
                    {...field}
                    onBlur={field.onBlur} // 포커스를 잃을 때도 유효성 검사
                    className="h-10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-end">
            {/* <Link to="#" className="text-sm text-orange-600 hover:underline">
              비밀번호 찾기
            </Link> */}
          </div>
          <SubmitButton
            type="submit"
            isLoading={isLoggingIn}
            disabled={isLoggingIn}
            className="w-full rounded-lg bg-orange-500 py-2 font-semibold text-white transition-colors hover:bg-orange-400"
          >
            로그인
          </SubmitButton>
        </form>
      </Form>

      <footer className="flex flex-col space-y-4">
        <div className="relative mt-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              또는
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline" // 기본 버튼과 다른 스타일 적용
          onClick={handleTestLogin}
          disabled={anyLoginInProgress} // 어떤 로그인이든 진행 중이면 비활성화
          className="w-full bg-gradient-to-r from-orange-300 to-destructive font-bold text-white transition-colors hover:from-orange-200 hover:to-red-400 hover:text-white"
        >
          {isLoggingIn ? ( // isLoggingIn 상태를 사용하여 로딩 표시
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          {isLoggingIn ? '로그인 중...' : '테스트 계정으로 로그인'}
        </Button>

        <CustomGoogleLoginButton
          isLoading={isGoogleLoggingIn}
          disabled={isLoggingIn || !isGoogleLoggingIn} // Disable if either is loading
          // className="w-full" // Already set to w-full inside the component, but can override if needed
        />

        {/* 회원가입 링크 */}
        <div className="mt-4 text-center">
          <span className="text-gray-600">계정이 없으신가요? </span>
          <Link
            to="/auth/register"
            className="font-semibold text-orange-500 transition-colors hover:text-orange-400"
          >
            회원 가입
          </Link>
        </div>
      </footer>
    </>
  );
}
