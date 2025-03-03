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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const accessTokenRef = useRef<string | null>(null);

  // 새로 추가: 인증 여부 확인이 완료되기 전까지 true
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const getAccessToken = () => {
    return accessTokenRef.current;
  };

  const updateAccessToken = (token: string) => {
    accessTokenRef.current = token;

    setIsAuthenticated(true);
  };

  // ! 로그아웃 시, AuthContext 초기화
  const resetAuthentication = () => {
    // 1) 토큰 제거
    accessTokenRef.current = null;
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
    mutate();
  }, [mutate]);

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
