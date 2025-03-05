import { DefaultOptions } from "@tanstack/react-query";

export const queryConfig = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60,
  },
} satisfies DefaultOptions;
// as DefaultOptions를 사용하는 경우, 전체 타입을 강제 변환하지만, satisfies를 사용하면 올바른 속성만 체크하고 타입 강제 변환은 하지 않음.

// ! 비동기 함수 반환 타입을 추출할때..
export type ApiFnReturnType<FnType extends (...args: any) => Promise<any>> =
  Awaited<ReturnType<FnType>>;
