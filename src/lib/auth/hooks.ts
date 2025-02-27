import { useMutation } from "@tanstack/react-query";
import { loginFn, logoutFn, registerFn } from "./api";
import { AxiosError } from "axios";
import { LoginErrorResponse, RegisterErrorResponse } from "./types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";
import { toast } from "sonner";
import { useAuthApiClient } from "./useAuthApiClient";

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
      navigate("/app/dashboard");
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

export const useLogout = () => {
  const { resetAuthentication } = useAuth();
  const navigate = useNavigate();
  const authApiClient = useAuthApiClient();

  // ! 로그아웃 함수

  const { mutate, isPending } = useMutation({
    mutationFn: () => logoutFn(authApiClient),
    onSuccess: () => {
      // 1) AuthContext를 초기화
      resetAuthentication();
      // 2) 로그인 페이지로 이동
      navigate("/auth/login");

      toast.success("로그아웃 되었습니다.");
    },
    onError: (error: AxiosError) => {
      // 에러 처리
      console.error("로그아웃 중 오류 발생: ", error);
      toast.error("로그아웃에 실패했습니다.");
      toast.error("로그아웃 중 오류가 발생했습니다.");
    },
  });

  return { logout: mutate, isLoggingOut: isPending };
};
