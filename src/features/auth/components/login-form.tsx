import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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

// TODO : 일단 지금은 useState를 사용해서 email, password를 관리하고, 나중에 react-hook-form, zod 사용해서 리팩토링

type LoginFormProps = {
  onSuccessNavigate: () => void;
};
const LoginForm = ({ onSuccessNavigate }: LoginFormProps) => {
  const { mutate: login } = useLogin({ onSuccessNavigate });
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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name={"email"}
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="abcde@example.com"
                    type="email"
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
            name={"password"}
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Password"
                    type="password"
                    required
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription></FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 로그인 버튼 */}
          <Button
            type="submit"
            className="w-full py-2 rounded-lg text-white font-semibold bg-orange-500 hover:bg-orange-400 transition-colors"
          >
            로그인
          </Button>
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
