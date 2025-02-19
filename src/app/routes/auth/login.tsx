import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginRoute() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 로직 구현
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        {/* 제목 */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-orange-500">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Please sign in to continue</p>
        </div>

        {/* 로그인 폼 */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg text-white font-semibold bg-orange-500 hover:bg-orange-400 transition-colors"
          >
            Sign In
          </button>
        </form>

        {/* 회원가입 링크 */}
        <div className="mt-4 text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <Link
            to="/auth/register"
            className="font-semibold text-orange-500 hover:text-orange-400 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
