import { useMutation } from "@tanstack/react-query";
import { loginFn, logoutFn, registerFn } from "./api";
import { AxiosError } from "axios";
import { LoginErrorResponse, RegisterErrorResponse } from "./types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";
import { toast } from "sonner";
import { useAuthApiClient } from "./useAuthApiClient";

// ! 로그인 hook
export const useLogin = ({
  onSuccessNavigate,
  setIsLoggingIn,
}: {
  onSuccessNavigate: () => void;
  setIsLoggingIn: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { updateAccessToken } = useAuth();

  const { mutate } = useMutation({
    mutationFn: loginFn,
    // 요청 직전에 isLoggingIn을 true로 설정
    onMutate: () => {
      setIsLoggingIn(true);
    },
    // 요청 성공 시
    onSuccess: (data) => {
      updateAccessToken(data.accessToken);
      toast.success("로그인 성공");
      onSuccessNavigate();
    },
    // 요청 실패 시
    onError: (error: AxiosError<LoginErrorResponse>) => {
      console.error(error.response?.data.message);
      toast.error("로그인 실패");
    },
    // 성공/실패와 관계없이 항상 호출
    onSettled: () => {
      setIsLoggingIn(false);
      // ↑ 이미 onSuccess, onError 모두에서 false로 설정했다면 중복 설정은 생략 가능
    },
  });

  return { mutate };
};
// ! 회원가입 hook
export const useRegister = ({
  onSuccessNavigate,
  setIsRegistering,
}: {
  onSuccessNavigate: () => void;
  setIsRegistering: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { mutate } = useMutation({
    mutationFn: registerFn,
    onMutate: () => {
      setIsRegistering(true);
    },

    onSuccess: () => {
      toast.success("회원가입이 완료되었습니다.");
      onSuccessNavigate();
    },
    onError: (error: AxiosError<RegisterErrorResponse>) => {
      toast.error(
        error.response?.data.message || "회원가입 중 오류가 발생했습니다."
      );
    },

    onSettled: () => {
      setIsRegistering(false);
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
