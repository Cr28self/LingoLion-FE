import { createContext, useContext, useEffect, useRef, useState } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  getAccessToken: () => string | null;
  updateAccessToken: (token: string) => void;
};

//  useContext(AuthContext)가 최초 호출될 때 기본적으로 반환하는 값
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  getAccessToken: () => null,
  updateAccessToken: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const accessTokenRef = useRef<string | null>(null);

  const getAccessToken = () => {
    return accessTokenRef.current;
  };

  const updateAccessToken = (token: string) => {
    accessTokenRef.current = token;

    setIsAuthenticated(true);
  };

  useEffect(() => {
    console.log("sdfa");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        getAccessToken,
        updateAccessToken,
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
