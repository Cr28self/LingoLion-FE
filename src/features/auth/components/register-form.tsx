import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import SubmitButton from './button/submit-button.tsx';
import { useState } from 'react';
import { useRegister } from '../hooks/use-register';
import { registerSchema, TRegisterSchema } from '../schema/register-schema';
import { ThemedInput } from '@/components/ui/themed-input.tsx';
type RegisterFormProps = {
  onSuccessNavigate: () => void;
};
export default function RegisterForm({ onSuccessNavigate }: RegisterFormProps) {
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const { mutate: register } = useRegister({
    onSuccessNavigate,
    setIsRegistering,
  });

  const form = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
    },
  });

  const onSubmit = ({
    email,
    password,
    name,
  }: z.infer<typeof registerSchema>) => {
    register({ email, password, name });
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name={'email'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <ThemedInput
                    placeholder="abcde@example.com"
                    type="email"
                    className="h-10"
                    required
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'password'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <ThemedInput
                    placeholder="Password"
                    type="password"
                    className="h-10"
                    required
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription></FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={'confirmPassword'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호 확인</FormLabel>
                <FormControl>
                  <ThemedInput
                    placeholder="비밀번호 확인"
                    type="password"
                    className="h-10"
                    required
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription></FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={'name'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>이름</FormLabel>
                <FormControl>
                  <ThemedInput
                    className="h-10"
                    placeholder="이름"
                    type="text"
                    required
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton
            type="submit"
            isLoading={isRegistering}
            disabled={isRegistering}
            className="w-full rounded-lg bg-orange-500 py-2 font-semibold text-white transition-colors hover:bg-orange-400"
          >
            회원 가입
          </SubmitButton>
        </form>
      </Form>

      {/* 로그인 링크 */}
      <div className="mt-4 text-center">
        <span className="text-gray-600 dark:text-gray-400">
          이미 계정이 있으신가요?{' '}
        </span>
        <Link
          to="/auth/login"
          className="font-semibold text-orange-500 transition-colors hover:text-orange-400"
        >
          로그인
        </Link>
      </div>
    </>
  );
}
