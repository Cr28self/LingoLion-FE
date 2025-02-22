import { useMutation } from "@tanstack/react-query";
import { loginFn, registerFn } from "./api";
import { AxiosError } from "axios";
import { LoginErrorResponse, RegisterErrorResponse } from "./types";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const { mutate } = useMutation({
    mutationFn: loginFn,
    onSuccess: (data) => {
      // access token을 context에 저장
      // dashboard로 redirect

      console.log("데이터!!!!!", data);
      //   toast.success("로그인 성공");
    },
    onError: (error: AxiosError<LoginErrorResponse>) => {
      // error toast

      console.error(error);
      //   toast.error(error.response?.data.message);
    },
  });

  return { mutate };
};

export const useRegister = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: registerFn,
    onSuccess: (data) => {
      console.log(data);

      navigate("/auth/login");
    },
    onError: (error: AxiosError<RegisterErrorResponse>) => {
      //   toast.error(error.response?.data.message);
    },
  });

  return { mutate };
};
