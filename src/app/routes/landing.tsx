import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-orange-500 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* 로고 */}
        <a href="#" className="text-2xl font-bold">
          MyLanding
        </a>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-orange-300 transition">
            Home
          </a>
          <a href="#" className="hover:text-orange-300 transition">
            Features
          </a>
          <a href="#" className="hover:text-orange-300 transition">
            Pricing
          </a>
          <a href="#" className="hover:text-orange-300 transition">
            Contact
          </a>
        </nav>

        {/* 로그인 버튼 */}
        <Link to="/auth/login" className="hidden md:block">
          <Button className="bg-white text-orange-500 hover:bg-orange-100">
            로그인
          </Button>
        </Link>

        {/* 모바일 메뉴 버튼 */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <Menu size={24} />
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {isOpen && (
        <div className="md:hidden bg-orange-600 p-4">
          <a href="#" className="block py-2 text-white hover:text-orange-300">
            Home
          </a>
          <a href="#" className="block py-2 text-white hover:text-orange-300">
            Features
          </a>
          <a href="#" className="block py-2 text-white hover:text-orange-300">
            Pricing
          </a>
          <a href="#" className="block py-2 text-white hover:text-orange-300">
            Contact
          </a>
          <Button className="w-full mt-4 bg-white text-orange-500 hover:bg-orange-100">
            로그인
          </Button>
        </div>
      )}
    </header>
  );
}

const ErrComponent = () => {
  throw new Error("ErrorBoundary Test");
};

const LandingRoute = () => {
  return (
    <ErrorBoundary fallback={<div>에러가 발생했습니다.</div>}>
      <div className="bg-gray-50 min-h-screen">
        {/* <ErrComponent /> */}
        <Header />
        Landing Route
      </div>
    </ErrorBoundary>
  );
};

export default LandingRoute;
