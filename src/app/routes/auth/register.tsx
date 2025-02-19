// Signup.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterRoute() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // 회원가입 로직 구현
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#FFEFDC" }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="mb-6">
          <h1
            className="text-3xl font-bold text-center"
            style={{ color: "#F97315" }}
          >
            Create Account
          </h1>
          <p className="text-gray-600 text-center mt-2">
            Join our community today
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: "#FB923C", focusRingColor: "#F97315" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: "#FB923C", focusRingColor: "#F97315" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: "#FB923C", focusRingColor: "#F97315" }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg text-white font-semibold transition-colors"
            style={{
              backgroundColor: "#F97315",
              ":hover": { backgroundColor: "#FB923C" },
            }}
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-gray-600">Already have an account? </span>
          <Link
            to="/auth/login"
            className="font-semibold transition-colors"
            style={{ color: "#F97315", ":hover": { color: "#FB923C" } }}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
