import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRegister } from "@/lib/auth/hooks";
import { registerSchema } from "@/lib/auth/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
type RegisterFormProps = {
  onSuccessNavigate: () => void;
};
const RegisterForm = ({ onSuccessNavigate }: RegisterFormProps) => {
  const { mutate: register } = useRegister({ onSuccessNavigate });

  const form = useForm<z.infer<typeof registerSchema>>({
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
                <FormLabel>비밀번호</FormLabel>
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

          <FormField
            control={form.control}
            name={"confirmPassword"}
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel>비밀번호 확인</FormLabel>
                <FormControl>
                  <Input
                    placeholder="비밀번호 확인"
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

          <FormField
            control={form.control}
            name={"name"}
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>이름</FormLabel>
                <FormControl>
                  <Input
                    className="w-full px-3 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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

          <Button
            type="submit"
            className="w-full py-2 rounded-lg text-white font-semibold bg-orange-500 hover:bg-orange-400 transition-colors"
          >
            회원 가입
          </Button>
        </form>
      </Form>

      {/* 로그인 링크 */}
      <div className="mt-4 text-center">
        <span className="text-gray-600">Already have an account? </span>
        <Link
          to="/auth/login"
          className="font-semibold text-orange-500 hover:text-orange-400 transition-colors"
        >
          로그인
        </Link>
      </div>
    </>
  );
};

export default RegisterForm;
