import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    baseURL: "http://localhost:5173", // Vite 개발 서버 주소
    browserName: "chromium", // 기본 브라우저 설정
    headless: false, // UI 테스트 확인을 위해 headless 모드 비활성화
  },
  testDir: "./e2e/tests", // 테스트 파일이 위치할 폴더
});
