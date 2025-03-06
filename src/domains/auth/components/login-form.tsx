import { Link } from "react-router-dom";
import { z } from "zod";
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
import { loginSchema } from "@/lib/auth/schema";
import { useLogin } from "@/lib/auth/hooks";
import { useState } from "react";
import SubmitButton from "./SubmitButton";

type LoginFormProps = {
  onSuccessNavigate: () => void;
};

const LoginForm = ({ onSuccessNavigate }: LoginFormProps) => {
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const { mutate: login } = useLogin({ onSuccessNavigate, setIsLoggingIn });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = ({ email, password }: z.infer<typeof loginSchema>) => {
    login({ email, password });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="abcde@example.com"
                    type="email"
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
              <FormItem className="mb-6">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Password"
                    type="password"
                    {...field}
                    onBlur={field.onBlur} // 포커스를 잃을 때도 유효성 검사
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
      {/* 회원가입 링크 */}
      <div className="mt-4 text-center">
        <span className="text-gray-600">Don't have an account? </span>
        <Link
          to="/auth/register"
          className="font-semibold text-orange-500 hover:text-orange-400 transition-colors"
        >
          회원 가입
        </Link>
      </div>
    </>
  );
};

export default LoginForm;
