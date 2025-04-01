import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import SubmitButton from "./button/submit-button.tsx";
import { useState } from "react";
import { useRegister } from "../hooks/use-register";
import { registerSchema, TRegisterSchema } from "../schema/register-schema";
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
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
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
            name={"email"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
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
            name={"password"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input
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
            name={"confirmPassword"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호 확인</FormLabel>
                <FormControl>
                  <Input
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
            name={"name"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>이름</FormLabel>
                <FormControl>
                  <Input
                    className="w-full px-3 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 h-10"
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
            className="w-full py-2 rounded-lg text-white font-semibold bg-orange-500 hover:bg-orange-400 transition-colors"
          >
            회원 가입
          </SubmitButton>
        </form>
      </Form>

      {/* 로그인 링크 */}
      <div className="mt-4 text-center">
        <span className="text-gray-600">이미 계정이 있으신가요? </span>
        <Link
          to="/auth/login"
          className="font-semibold text-orange-500 hover:text-orange-400 transition-colors"
        >
          로그인
        </Link>
      </div>
    </>
  );
}
