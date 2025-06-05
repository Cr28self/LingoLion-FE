import { useThemeStore } from '@/store/theme-store';
import React, { useEffect } from 'react';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useThemeStore();
  console.log(theme);

  useEffect(() => {
    // <html> 태그에 'dark' 클래스를 추가/제거합니다.
    // 이는 Tailwind CSS의 `darkMode: 'class'` 설정과 연동됩니다.
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]); // theme 상태가 변경될 때마다 실행

  return <>{children}</>;
};

export default ThemeProvider;
