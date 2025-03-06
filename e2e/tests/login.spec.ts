import { test, expect } from "@playwright/test";

test("Can login", async ({ page }) => {
  await page.goto("/auth/login"); // 로그인 페이지 이동

  await page.fill('input[name="email"]', "test@example.com"); // 이메일 입력
  await page.fill('input[name="password"]', "password123"); // 비밀번호 입력
  await page.click('button[type="submit"]'); // 로그인 버튼 클릭

  await expect(page).toHaveURL("/app/dashboard"); // 로그인 성공 후 대시보드 이동 확인
});
