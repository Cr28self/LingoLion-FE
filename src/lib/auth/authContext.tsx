import { createContext, useContext, useEffect, useRef, useState } from "react";
import { refreshTokenFn } from "./api";
import { useMutation } from "@tanstack/react-query";

type AuthContextType = {
  isAuthenticated: boolean;
  isPending: boolean;
  isCheckingAuth: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  getAccessToken: () => string | null;
  updateAccessToken: (token: string) => void;
  resetAuthentication: () => void;
};

//  useContext(AuthContext)가 최초 호출될 때 기본적으로 반환하는 값
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isPending: false,
  isCheckingAuth: false, // 기본값
  setIsAuthenticated: () => {},
  getAccessToken: () => null,
  updateAccessToken: () => {},
  resetAuthentication: () => {},
});

// sessionStorage 키 상수
const ACCESS_TOKEN_KEY = "accessToken";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const accessTokenRef = useRef<string | null>(null);
  console.log(accessTokenRef);

  // 새로 추가: 인증 여부 확인이 완료되기 전까지 true
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const getAccessToken = () => {
    return accessTokenRef.current;
  };

  const updateAccessToken = (token: string) => {
    accessTokenRef.current = token;
    // 토큰을 sessionStorage에 저장
    sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
    setIsAuthenticated(true);
  };

  // ! 로그아웃 시, AuthContext 초기화
  const resetAuthentication = () => {
    // 1) 토큰 제거
    accessTokenRef.current = null;
    // sessionStorage에서도 토큰 제거
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    // 2) 인증 상태 false
    setIsAuthenticated(false);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: refreshTokenFn,
    onSuccess: (data) => {
      if (data?.accessToken) {
        updateAccessToken(data.accessToken);
      }

      setIsCheckingAuth(false); // 토큰 갱신 끝났으니 false
    },
    onError: () => {
      console.error("토큰 갱신 실패");
      setIsAuthenticated(false);
      setIsCheckingAuth(false); // 토큰 갱신 끝났으니 false
    },
  });

  useEffect(() => {
    // sessionStorage에서 토큰 확인
    const storedToken = sessionStorage.getItem(ACCESS_TOKEN_KEY);

    if (storedToken) {
      // sessionStorage에 토큰이 있으면 사용
      accessTokenRef.current = storedToken;
      setIsAuthenticated(true);
      // 토큰을 사용한 후 sessionStorage에서 제거
      sessionStorage.removeItem(ACCESS_TOKEN_KEY);
      setIsCheckingAuth(false);
    } else {
      // sessionStorage에 토큰이 없으면 mutate 실행
      mutate();
    }
  }, [mutate]);

  // 페이지 언로드(새로고침 또는 페이지 이동) 전에 토큰 저장
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (accessTokenRef.current) {
        sessionStorage.setItem(ACCESS_TOKEN_KEY, accessTokenRef.current);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isPending,
        isCheckingAuth,
        setIsAuthenticated,
        getAccessToken,
        updateAccessToken,
        resetAuthentication,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Context에 쉽게 접근하기 위한 Hook
export const useAuth = () => {
  return useContext(AuthContext);
};
