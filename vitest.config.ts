import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true, // Jest 스타일의 글로벌 테스트 함수를 사용 가능하게 함
    environment: "jsdom", // 브라우저 환경에서 테스트할 수 있도록 설정
    setupFiles: "src/testing/setup-test.ts", // 테스트 전 실행할 파일 (예: jest-dom 설정)
  },
});
