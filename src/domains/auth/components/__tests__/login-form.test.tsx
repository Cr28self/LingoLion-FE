import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import * as hooks from "@/lib/auth/hooks";
import * as schema from "@/lib/auth/schema";
import * as zodResolver from "@hookform/resolvers/zod";
import LoginForm from "../login-form";

// 실제 스키마 사용을 위한 설정 (모킹하지 않음)
const originalLoginSchema = schema.loginSchema;

describe("LoginForm", () => {
  const onSuccessNavigateMock = vi.fn();
  const loginMutationMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // useLogin 훅 모킹
    vi.spyOn(hooks, "useLogin").mockImplementation(
      ({ onSuccessNavigate, setIsLoggingIn }) => {
        return {
          mutate: (credentials) => {
            loginMutationMock(credentials);
            setIsLoggingIn(true);

            // 로그인 성공 시뮬레이션
            setTimeout(() => {
              setIsLoggingIn(false);
              onSuccessNavigate();
            }, 100);
          },
        };
      }
    );
  });

  // 1. 렌더링 테스트
  it("컴포넌트가 올바르게 렌더링되는지 확인", () => {
    render(
      <BrowserRouter>
        <LoginForm onSuccessNavigate={onSuccessNavigateMock} />
      </BrowserRouter>
    );

    // 필수 요소들이 렌더링되는지 확인
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /로그인/i })).toBeInTheDocument();
    expect(screen.getByText(/don't have an account\?/i)).toBeInTheDocument();
    expect(screen.getByText(/회원 가입/i)).toBeInTheDocument();
  });

  // 2. 사용자 입력 테스트
  it("이메일과 비밀번호 입력이 잘 작동하는지 검증", async () => {
    render(
      <BrowserRouter>
        <LoginForm onSuccessNavigate={onSuccessNavigateMock} />
      </BrowserRouter>
    );

    const user = userEvent.setup();
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    // 입력값 변경 테스트
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  // 3. 유효성 검사 테스트 - 수정된 버전
  // it("유효하지 않은 이메일 형식 검증", async () => {
  //   // 실제 zodResolver와 유사하게 동작하도록 모킹
  //   const validateMock = vi.fn().mockImplementation((values) => {
  //     // 폼 값을 실제 zod 스키마로 검증
  //     try {
  //       originalLoginSchema.parse(values);
  //       return { values, errors: {} };
  //     } catch (error) {
  //       // zod 오류를 react-hook-form 형식으로 변환
  //       const formErrors = {};
  //       if (error.errors) {
  //         error.errors.forEach((err) => {
  //           const path = err.path.join(".");
  //           formErrors[path] = { message: err.message, type: "validation" };
  //         });
  //       }
  //       return { values: {}, errors: formErrors };
  //     }
  //   });

  //   vi.spyOn(zodResolver, "zodResolver").mockImplementation(() => {
  //     return validateMock;
  //   });

  //   render(
  //     <BrowserRouter>
  //       <LoginForm onSuccessNavigate={onSuccessNavigateMock} />
  //     </BrowserRouter>
  //   );

  //   const user = userEvent.setup();
  //   const emailInput = screen.getByLabelText(/email/i);
  //   const submitButton = screen.getByRole("button", { name: /로그인/i });

  //   // 잘못된 이메일 형식 입력
  //   await user.type(emailInput, "invalidemail");

  //   // 폼 제출
  //   await user.click(submitButton);

  //   // 오류 메시지 확인을 위한 대기
  //   await waitFor(() => {
  //     // FormMessage가 오류를 어떻게 표시하는지 확인
  //     // 일반적으로 role="alert"을 사용하거나 특정 클래스를 가진 요소일 수 있음
  //     const errorMessages = screen.getAllByRole("alert");

  //     // 메시지 내용 확인 (대소문자 무시)
  //     const hasEmailError = errorMessages.some((msg) =>
  //       msg.textContent?.toLowerCase().includes("유효한 이메일")
  //     );

  //     expect(hasEmailError).toBe(true);
  //   });
  // });

  // 4. 제출 기능 테스트
  it("폼 제출 시 login 함수가 호출되는지 확인", async () => {
    render(
      <BrowserRouter>
        <LoginForm onSuccessNavigate={onSuccessNavigateMock} />
      </BrowserRouter>
    );

    const user = userEvent.setup();
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /로그인/i });

    // 폼 입력 및 제출
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    // login 함수 호출 확인
    expect(loginMutationMock).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });

  // 5. 로딩 상태 테스트
  it("로딩 중일 때 버튼 상태 변화 확인", async () => {
    let setIsLoggingInCallback;

    // 기존 모킹 재정의
    vi.spyOn(hooks, "useLogin").mockImplementation(({ setIsLoggingIn }) => {
      setIsLoggingInCallback = setIsLoggingIn;
      return {
        mutate: () => {},
      };
    });

    render(
      <BrowserRouter>
        <LoginForm onSuccessNavigate={onSuccessNavigateMock} />
      </BrowserRouter>
    );

    const submitButton = screen.getByRole("button", { name: /로그인/i });

    // 초기 상태 확인
    expect(submitButton).not.toBeDisabled();

    // 로딩 상태로 변경
    setIsLoggingInCallback(true);

    // 버튼이 비활성화되었는지 확인
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  // 6. 네비게이션 테스트
  it("로그인 성공 후 페이지 이동 확인", async () => {
    render(
      <BrowserRouter>
        <LoginForm onSuccessNavigate={onSuccessNavigateMock} />
      </BrowserRouter>
    );

    const user = userEvent.setup();
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /로그인/i });

    // 폼 입력 및 제출
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    // 로그인 성공 후 네비게이션 함수 호출 확인
    await waitFor(() => {
      expect(onSuccessNavigateMock).toHaveBeenCalled();
    });
  });

  // 7. 회원가입 링크 테스트
  it("회원가입 링크가 올바른 경로를 가리키는지 확인", () => {
    render(
      <BrowserRouter>
        <LoginForm onSuccessNavigate={onSuccessNavigateMock} />
      </BrowserRouter>
    );

    const registerLink = screen.getByText(/회원 가입/i);
    expect(registerLink).toHaveAttribute("href", "/auth/register");
  });
});
