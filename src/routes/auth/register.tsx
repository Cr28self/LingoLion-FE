import AuthLayout from "@/components/layout/auth-layout";
import RegisterForm from "@/domains/auth/components/register-form";
import { useNavigate } from "react-router-dom";

export const RegisterRoute = () => {
  const navigate = useNavigate();
  return (
    <AuthLayout title="회원 가입">
      {/* 회원가입 폼 */}

      <RegisterForm onSuccessNavigate={() => navigate("/auth/login")} />
    </AuthLayout>
  );
};
