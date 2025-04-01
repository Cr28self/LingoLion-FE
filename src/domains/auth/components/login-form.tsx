import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useState } from "react";
import SubmitButton from "./button/submit-button.tsx";
import useLogin from "../hooks/use-login";
import { loginSchema, TLoginSchema } from "../schema/login-schema";
import CustomGoogleLoginButton from "./button/custom-google-login-button.tsx";

type LoginFormProps = {
  onSuccessNavigate: () => void;
};

export default function LoginForm({ onSuccessNavigate }: LoginFormProps) {
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const { mutate: login } = useLogin({ onSuccessNavigate, setIsLoggingIn });

  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = ({ email, password }: TLoginSchema) => {
    login({ email, password });
  };

  const isGoogleLoading = false;

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
            <Link to="#" className="text-sm text-orange-600 hover:underline">
              비밀번호 찾기
            </Link>
          </div>
          <SubmitButton
            type="submit"
            isLoading={isLoggingIn}
            disabled={isLoggingIn}
            className="w-full py-2 rounded-lg text-white font-semibold bg-orange-500 hover:bg-orange-400 transition-colors"
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

        <CustomGoogleLoginButton
          isLoading={isGoogleLoading}
          disabled={isLoggingIn || !isGoogleLoading} // Disable if either is loading
          // className="w-full" // Already set to w-full inside the component, but can override if needed
        />

        {/* 회원가입 링크 */}
        <div className="mt-4 text-center">
          <span className="text-gray-600">계정이 없으신가요? </span>
          <Link
            to="/auth/register"
            className="font-semibold text-orange-500 hover:text-orange-400 transition-colors"
          >
            회원 가입
          </Link>
        </div>
      </footer>
    </>
  );
}
