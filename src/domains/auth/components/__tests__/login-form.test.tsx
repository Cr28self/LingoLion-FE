import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, test } from "vitest";
import LoginForm from "../login-form";
import { render, screen } from "@testing-library/react";

test("로그인 폼이 정상적으로 렌더링되어야 한다", () => {
  render(
    <MemoryRouter>
      <LoginForm onSuccessNavigate={() => {}} />
    </MemoryRouter>
  );

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /로그인/i })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /register/i })).toBeInTheDocument();
});
