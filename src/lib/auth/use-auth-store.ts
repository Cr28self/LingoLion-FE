import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type AuthState = {
  isCheckingAuth: boolean;
  isLoggedIn: boolean;
  accessToken: string | null;
  getAccessToken: () => string | null;
  updateAccessToken: (token: string) => void;
  resetAuthentication: () => void;
  finishCheckingAuth: () => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

const ACCESS_TOKEN_KEY = 'accessToken';

export const useAuthStore = create<AuthState>()(
  devtools(
    (set, get) => ({
      isCheckingAuth: true,
      isLoggedIn: false,
      accessToken: null,
      getAccessToken: () => get().accessToken,
      updateAccessToken: (token: string) => {
        set({ accessToken: token, isLoggedIn: true });
      },
      resetAuthentication: () => {
        sessionStorage.removeItem(ACCESS_TOKEN_KEY);
        set({ accessToken: null, isLoggedIn: false });
      },
      finishCheckingAuth: () => {
        set({ isCheckingAuth: false });
      },

      setIsLoggedIn: (isLoggedIn: boolean) => {
        set({ isLoggedIn });
      },
    }),
    { name: 'AuthStore' }
  )
);
