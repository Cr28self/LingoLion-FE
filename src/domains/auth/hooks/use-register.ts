import { useMutation } from "@tanstack/react-query";
import { registerFn } from "../api/register-api";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { RegisterErrorResponse } from "../types/error-types";

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
