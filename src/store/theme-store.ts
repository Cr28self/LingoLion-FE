import { create } from 'zustand';

type Theme = 'light' | 'dark';
type ThemeState = {
  theme: Theme;
  toggleTheme: () => void;
};

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    // 사용자의 OS 설정을 따를 것인지 (media) 아니면 저장된 값만 사용할 것인지 결정
    // 여기서는 저장된 값 우선.

    if (savedTheme) return savedTheme;

    // 시스템 설정 확인 (선택 사항)
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    return prefersDark ? 'dark' : 'light';
  }
  return 'light';
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: getInitialTheme(), // 기본 테마를 'light'로 설정
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';

      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
      }
      return {
        theme: newTheme,
      };
    }),
}));
