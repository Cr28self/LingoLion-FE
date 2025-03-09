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

  it("submits valid form", async () => {
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

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "ValidPass123!",
        name: "Test User",
      });
    });
  });

  it("handles loading state", async () => {
    vi.mocked(useRegister).mockImplementation(() => ({
      mutate: vi.fn(),
    }));

    const { rerender } = render(
      <Wrapper>
        <RegisterForm {...mockProps} />
      </Wrapper>
    );

    // Simulate loading state
    rerender(
      <Wrapper>
        <RegisterForm {...mockProps} />
      </Wrapper>
    );

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("shows API errors", async () => {
    const errorMessage = "Registration failed";
    vi.mocked(useRegister).mockImplementation(() => ({
      mutate: (_, { onError }) => onError({ message: errorMessage }),
    }));

    render(
      <Wrapper>
        <RegisterForm {...mockProps} />
      </Wrapper>
    );

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
