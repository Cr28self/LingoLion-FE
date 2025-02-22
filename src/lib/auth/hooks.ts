import { useMutation } from "@tanstack/react-query";

import { loginFn, registerFn } from "./api";

export const useLogin = () => {
  const { mutate } = useMutation({
    mutationFn: loginFn,
    onSuccess: (data) => {
      // access token을 context에 저장
      // dashboard로 redirect

      console.log("데이터!!!!!", data);
    },
    onError: (error) => {
      // error toast
      console.log("야스");
      console.error(error);
    },
  });

  return { mutate };
};

export const useRegister = () => {
  const mutate = useMutation({
    mutationFn: registerFn,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { mutate };
};
