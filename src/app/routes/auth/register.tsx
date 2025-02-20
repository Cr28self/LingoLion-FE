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
    <>
      {/* 제목 */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-orange-500">계정 생성</h1>
      </div>

      {/* 회원가입 폼 */}
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

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Confirm Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {/* 회원가입 버튼 */}
        <button
          type="submit"
          className="w-full py-2 rounded-lg text-white font-semibold bg-orange-500 hover:bg-orange-400 transition-colors"
        >
          회원 가입
        </button>
      </form>

      {/* 로그인 링크 */}
      <div className="mt-4 text-center">
        <span className="text-gray-600">Already have an account? </span>
        <Link
          to="/auth/login"
          className="font-semibold text-orange-500 hover:text-orange-400 transition-colors"
        >
          로그인
        </Link>
      </div>
    </>
  );
}
