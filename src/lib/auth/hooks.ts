import { useMutation } from "@tanstack/react-query";
import { loginFn, registerFn } from "./api";
import { AxiosError } from "axios";
import { LoginErrorResponse, RegisterErrorResponse } from "./types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";
import { toast } from "sonner";

// ! 로그인 hook
export const useLogin = () => {
  const navigate = useNavigate();
  const { updateAccessToken } = useAuth();
  const { mutate } = useMutation({
    mutationFn: loginFn,
    onSuccess: (data) => {
      // access token을 context에 저장
      // dashboard로 redirect
      updateAccessToken(data.accessToken);
      toast.success("로그인 성공");
      navigate("/dashboard");
    },
    onError: (error: AxiosError<LoginErrorResponse>) => {
      // error toast
      toast.error(error.response?.data.message || "로그인 실패");
    },
  });

  return { mutate };
};

// ! 회원가입 hook
export const useRegister = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: registerFn,
    onSuccess: (data) => {
      toast.success("회원가입이 완료되었습니다.");
      navigate("/auth/login");
    },
    onError: (error: AxiosError<RegisterErrorResponse>) => {
      toast.error(
        error.response?.data.message || "회원가입 중 오류가 발생했습니다."
      );
    },
  });

  return { mutate };
};
