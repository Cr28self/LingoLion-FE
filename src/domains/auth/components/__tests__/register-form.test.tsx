import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import RegisterForm from "../register-form";
import { registerSchema } from "@/lib/auth/schema";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock useRegister hook
vi.mock("@/lib/auth/hooks", () => ({
  useRegister: vi.fn(() => ({
    mutate: vi.fn(),
  })),
}));

// Mock React Query
const queryClient = new QueryClient();

const Wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("RegisterForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockProps = {
    onSuccessNavigate: vi.fn(),
  };

  it("renders all form fields", () => {
    render(
      <Wrapper>
        <RegisterForm {...mockProps} />
      </Wrapper>
    );

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("비밀번호")).toBeInTheDocument();
    expect(screen.getByLabelText("비밀번호 확인")).toBeInTheDocument();
    expect(screen.getByLabelText("이름")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "회원 가입" })
    ).toBeInTheDocument();
  });

  it("validates email format", async () => {
    render(
      <Wrapper>
        <RegisterForm {...mockProps} />
      </Wrapper>
    );

    fireEvent.input(screen.getByLabelText("Email"), {
      target: { value: "invalid-email" },
    });
    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText("Invalid email")).toBeInTheDocument();
    });
  });

  it("requires all fields", async () => {
    render(
      <Wrapper>
        <RegisterForm {...mockProps} />
      </Wrapper>
    );

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getAllByText("Required")).toHaveLength(4);
    });
  });

  it("validates password match", async () => {
    render(
      <Wrapper>
        <RegisterForm {...mockProps} />
      </Wrapper>
    );

    fireEvent.input(screen.getByLabelText("비밀번호"), {
      target: { value: "password123!" },
    });
    fireEvent.input(screen.getByLabelText("비밀번호 확인"), {
      target: { value: "different" },
    });
    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText("Passwords must match")).toBeInTheDocument();
    });
  });

  it("handles loading state", async () => {
    const mockRegister = vi.fn();
    vi.mocked(useRegister).mockImplementation(() => ({
      mutate: mockRegister,
    }));

    render(
      <Wrapper>
        <RegisterForm {...mockProps} />
      </Wrapper>
    );

    fireEvent.input(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.input(screen.getByLabelText("비밀번호"), {
      target: { value: "ValidPass123!" },
    });
    fireEvent.input(screen.getByLabelText("비밀번호 확인"), {
      target: { value: "ValidPass123!" },
    });
    fireEvent.input(screen.getByLabelText("이름"), {
      target: { value: "Test User" },
    });

    vi.mocked(useRegister).mockImplementation(() => ({
      mutate: (data, options) => {
        if (options?.setIsRegistering) options.setIsRegistering(true);
      },
    }));

    fireEvent.click(screen.getByRole("button", { name: "회원 가입" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "회원 가입" })).toBeDisabled();
    });
  });

  it("shows API errors", async () => {
    const errorMessage = "Registration failed";

    const mockRegister = vi.fn((data, options) => {
      if (options?.onError) options.onError(new Error(errorMessage));
    });

    vi.mocked(useRegister).mockImplementation(() => ({
      mutate: mockRegister,
    }));

    render(
      <Wrapper>
        <RegisterForm {...mockProps} />
      </Wrapper>
    );

    fireEvent.input(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.input(screen.getByLabelText("비밀번호"), {
      target: { value: "ValidPass123!" },
    });
    fireEvent.input(screen.getByLabelText("비밀번호 확인"), {
      target: { value: "ValidPass123!" },
    });
    fireEvent.input(screen.getByLabelText("이름"), {
      target: { value: "Test User" },
    });

    fireEvent.click(screen.getByRole("button", { name: "회원 가입" }));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it("calls onSuccessNavigate when registration is successful", async () => {
    const mockRegister = vi.fn((data, options) => {
      if (options?.onSuccess) options.onSuccess();
    });

    vi.mocked(useRegister).mockImplementation(() => ({
      mutate: mockRegister,
    }));

    render(
      <Wrapper>
        <RegisterForm {...mockProps} />
      </Wrapper>
    );

    fireEvent.input(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.input(screen.getByLabelText("비밀번호"), {
      target: { value: "ValidPass123!" },
    });
    fireEvent.input(screen.getByLabelText("비밀번호 확인"), {
      target: { value: "ValidPass123!" },
    });
    fireEvent.input(screen.getByLabelText("이름"), {
      target: { value: "Test User" },
    });

    fireEvent.click(screen.getByRole("button", { name: "회원 가입" }));

    await waitFor(() => {
      expect(mockProps.onSuccessNavigate).toHaveBeenCalled();
    });
  });

  it("validates password requirements", async () => {
    render(
      <Wrapper>
        <RegisterForm {...mockProps} />
      </Wrapper>
    );

    fireEvent.input(screen.getByLabelText("비밀번호"), {
      target: { value: "short" },
    });
    fireEvent.click(screen.getByRole("button", { name: "회원 가입" }));

    await waitFor(() => {
      const errorMessages = screen.getAllByText(
        /String must contain at least 8 character/i
      );
      expect(errorMessages.length).toBeGreaterThan(0);
    });
  });

  it("renders login link correctly", () => {
    render(
      <Wrapper>
        <RegisterForm {...mockProps} />
      </Wrapper>
    );

    const loginLink = screen.getByText("로그인");
    expect(loginLink).toBeInTheDocument();
    expect(loginLink.closest("a")).toHaveAttribute("href", "/auth/login");
  });

  it("updates form state when inputs change", async () => {
    render(
      <Wrapper>
        <RegisterForm {...mockProps} />
      </Wrapper>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("비밀번호");
    const confirmPasswordInput = screen.getByLabelText("비밀번호 확인");
    const nameInput = screen.getByLabelText("이름");

    fireEvent.input(emailInput, { target: { value: "test@example.com" } });
    fireEvent.input(passwordInput, { target: { value: "ValidPass123!" } });
    fireEvent.input(confirmPasswordInput, {
      target: { value: "ValidPass123!" },
    });
    fireEvent.input(nameInput, { target: { value: "Test User" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("ValidPass123!");
    expect(confirmPasswordInput).toHaveValue("ValidPass123!");
    expect(nameInput).toHaveValue("Test User");
  });
});
