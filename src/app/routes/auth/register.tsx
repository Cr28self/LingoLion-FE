import AuthLayout from "@/components/layout/auth-layout";
import RegisterForm from "@/features/auth/components/register-form";

export const RegisterRoute = () => {
  return (
    <AuthLayout title="회원 가입">
      {/* 회원가입 폼 */}

      <RegisterForm />
    </AuthLayout>
  );
};
