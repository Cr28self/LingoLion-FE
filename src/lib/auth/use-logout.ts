import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutFn } from "./api";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthenticatedApiClient } from "./use-authenticated-api-client";
import { useAuthStore } from "./use-auth-store";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { resetAuthentication } = useAuthStore();
  const navigate = useNavigate();
  const authApiClient = useAuthenticatedApiClient();

  // ! 로그아웃 함수

  const { mutate, isPending } = useMutation({
    mutationFn: () => logoutFn(authApiClient),
    onSuccess: () => {
      // 1) AuthContext를 초기화
      resetAuthentication();

      // 2) 모든 쿼리 캐시 삭제하고 초기화
      queryClient.clear();

      // 3) 로그인 페이지로 이동
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
