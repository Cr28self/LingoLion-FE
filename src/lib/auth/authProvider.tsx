import { useEffect } from "react";
import { refreshTokenFn } from "./api";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "./useAuthStore";

// sessionStorage 키 상수
const ACCESS_TOKEN_KEY = "accessToken";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const {
    updateAccessToken,
    finishCheckingAuth,
    getAccessToken,
    setIsLoggedIn,
  } = useAuthStore();

  const { mutate } = useMutation({
    mutationFn: refreshTokenFn,
    onSuccess: (data) => {
      if (data?.accessToken) {
        updateAccessToken(data.accessToken);
      }

      finishCheckingAuth(); // 토큰 갱신 끝났으니 false
    },
    onError: () => {
      console.error("토큰 갱신 실패");
      setIsLoggedIn(false);
      finishCheckingAuth(); // 토큰 갱신 끝났으니 false
    },
  });

  useEffect(() => {
    // sessionStorage에서 토큰 확인
    const storedToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);

    if (storedToken) {
      // sessionStorage에 토큰이 있으면 사용
      updateAccessToken(storedToken);
      // 토큰을 사용한 후 sessionStorage에서 제거
      sessionStorage.removeItem(ACCESS_TOKEN_KEY);
      finishCheckingAuth();
    } else {
      // sessionStorage에 토큰이 없으면 mutate 실행
      mutate();
    }
  }, [mutate]);

  // 페이지 언로드(새로고침 또는 페이지 이동) 전에 토큰 저장
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (getAccessToken()) {
        sessionStorage.setItem(ACCESS_TOKEN_KEY, getAccessToken() as string);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return <>{children}</>;
}
