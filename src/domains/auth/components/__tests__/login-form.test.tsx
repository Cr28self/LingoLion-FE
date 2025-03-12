// import { describe, it, expect, vi, beforeEach } from "vitest";
// import { render, screen, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { BrowserRouter } from "react-router-dom";

// import * as hooks from "@/lib/auth/hooks";

// import LoginForm from "../login-form";

// // 실제 스키마 사용을 위한 설정 (모킹하지 않음)

// describe("LoginForm", () => {
//   const onSuccessNavigateMock = vi.fn();
//   const loginMutationMock = vi.fn();

//   beforeEach(() => {
//     vi.clearAllMocks();

//     // useLogin 훅 모킹
//     vi.spyOn(hooks, "useLogin").mockImplementation(
//       ({ onSuccessNavigate, setIsLoggingIn }) => {
//         return {
//           mutate: (credentials) => {
//             loginMutationMock(credentials);
//             setIsLoggingIn(true);

//             // 로그인 성공 시뮬레이션
//             setTimeout(() => {
//               setIsLoggingIn(false);
//               onSuccessNavigate();
//             }, 100);
//           },
//         };
//       }
//     );
//   });

//   // 1. 렌더링 테스트
//   it("컴포넌트가 올바르게 렌더링되는지 확인", () => {
//     render(
//       <BrowserRouter>
//         <LoginForm onSuccessNavigate={onSuccessNavigateMock} />
//       </BrowserRouter>
//     );

//     // 필수 요소들이 렌더링되는지 확인
//     expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
//     expect(screen.getByRole("button", { name: /로그인/i })).toBeInTheDocument();
//     expect(screen.getByText(/don't have an account\?/i)).toBeInTheDocument();
//     expect(screen.getByText(/회원 가입/i)).toBeInTheDocument();
//   });

//   // 2. 사용자 입력 테스트
//   it("이메일과 비밀번호 입력이 잘 작동하는지 검증", async () => {
//     render(
//       <BrowserRouter>
//         <LoginForm onSuccessNavigate={onSuccessNavigateMock} />
//       </BrowserRouter>
//     );

//     const user = userEvent.setup();
//     const emailInput = screen.getByLabelText(/email/i);
//     const passwordInput = screen.getByLabelText(/password/i);

//     // 입력값 변경 테스트
//     await user.type(emailInput, "test@example.com");
//     await user.type(passwordInput, "password123");

//     expect(emailInput).toHaveValue("test@example.com");
//     expect(passwordInput).toHaveValue("password123");
//   });

//   // 4. 제출 기능 테스트
//   it("폼 제출 시 login 함수가 호출되는지 확인", async () => {
//     render(
//       <BrowserRouter>
//         <LoginForm onSuccessNavigate={onSuccessNavigateMock} />
//       </BrowserRouter>
//     );

//     const user = userEvent.setup();
//     const emailInput = screen.getByLabelText(/email/i);
//     const passwordInput = screen.getByLabelText(/password/i);
//     const submitButton = screen.getByRole("button", { name: /로그인/i });

//     // 폼 입력 및 제출
//     await user.type(emailInput, "test@example.com");
//     await user.type(passwordInput, "password123");
//     await user.click(submitButton);

//     // login 함수 호출 확인
//     expect(loginMutationMock).toHaveBeenCalledWith({
//       email: "test@example.com",
//       password: "password123",
//     });
//   });

//   // 5. 로딩 상태 테스트
//   it("로딩 중일 때 버튼 상태 변화 확인", async () => {
//     let setIsLoggingInCallback;

//     // 기존 모킹 재정의
//     vi.spyOn(hooks, "useLogin").mockImplementation(({ setIsLoggingIn }) => {
//       setIsLoggingInCallback = setIsLoggingIn;
//       return {
//         mutate: () => {},
//       };
//     });

//     render(
//       <BrowserRouter>
//         <LoginForm onSuccessNavigate={onSuccessNavigateMock} />
//       </BrowserRouter>
//     );

//     const submitButton = screen.getByRole("button", { name: /로그인/i });

//     // 초기 상태 확인
//     expect(submitButton).not.toBeDisabled();

//     // 로딩 상태로 변경

//     // 버튼이 비활성화되었는지 확인
//     await waitFor(() => {
//       expect(submitButton).toBeDisabled();
//     });
//   });

//   // 6. 네비게이션 테스트
//   it("로그인 성공 후 페이지 이동 확인", async () => {
//     render(
//       <BrowserRouter>
//         <LoginForm onSuccessNavigate={onSuccessNavigateMock} />
//       </BrowserRouter>
//     );

//     const user = userEvent.setup();
//     const emailInput = screen.getByLabelText(/email/i);
//     const passwordInput = screen.getByLabelText(/password/i);
//     const submitButton = screen.getByRole("button", { name: /로그인/i });

//     // 폼 입력 및 제출
//     await user.type(emailInput, "test@example.com");
//     await user.type(passwordInput, "password123");
//     await user.click(submitButton);

//     // 로그인 성공 후 네비게이션 함수 호출 확인
//     await waitFor(() => {
//       expect(onSuccessNavigateMock).toHaveBeenCalled();
//     });
//   });

//   // 7. 회원가입 링크 테스트
//   it("회원가입 링크가 올바른 경로를 가리키는지 확인", () => {
//     render(
//       <BrowserRouter>
//         <LoginForm onSuccessNavigate={onSuccessNavigateMock} />
//       </BrowserRouter>
//     );

//     const registerLink = screen.getByText(/회원 가입/i);
//     expect(registerLink).toHaveAttribute("href", "/auth/register");
//   });
// });
