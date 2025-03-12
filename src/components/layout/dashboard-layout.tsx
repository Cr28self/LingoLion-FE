import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/domains/dashboard/components/Dashboard-Sidebar";
import { useLogout } from "@/lib/auth/hooks";
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSidebarStore } from "@/domains/dashboard/store/sidebar-store";
import { Menu } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { logout, isLoggingOut } = useLogout();
  const location = useLocation();
  const { isOpen, toggle } = useSidebarStore();

  const menuItems = [
    {
      name: "Overview",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      path: "/app/dashboard/overview",
    },
    {
      name: "회화 목록",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      path: "/app/dashboard/conversations",
    },
    {
      name: "상황 목록",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      path: "/app/dashboard/situations",
    },
    {
      name: "Settings",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      path: "/app/dashboard/setting",
    },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-orange-50 to-orange-100 overflow-hidden">
      {/* Background blurred circles for glassmorphism effect */}
      <div className="absolute w-64 h-64 rounded-full bg-orange-300 filter blur-3xl opacity-20 -top-10 -left-10 z-0"></div>
      <div className="absolute w-96 h-96 rounded-full bg-orange-400 filter blur-3xl opacity-20 bottom-0 right-0 z-0"></div>
      <div className="absolute w-64 h-64 rounded-full bg-orange-200 filter blur-3xl opacity-20 top-1/3 right-1/4 z-0"></div>

      {/* Sidebar */}
      <DashboardSidebar>
        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200 backdrop-blur-sm group ${
                location.pathname === item.path ? "bg-white/10" : ""
              }`}
            >
              <span className={`${isOpen ? "mr-3" : "mx-auto"}`}>
                {item.icon}
              </span>
              {isOpen && (
                <span className="font-medium group-hover:translate-x-1 transition-transform duration-200 truncate">
                  {item.name}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div
          className={`mt-auto border-t border-white/20 pt-4 ${
            isOpen ? "" : "text-center"
          }`}
        >
          {isOpen ? (
            <div className="flex items-center px-3">
              <div className="shrink-0">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">SH</span>
                </div>
              </div>
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium text-white truncate">
                  SangHyun Oh
                </p>
                <p className="text-xs text-orange-100 truncate">
                  cr28self@gmail.com
                </p>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg mx-auto">
              <span className="text-white font-bold">SH</span>
            </div>
          )}
          <Button
            className={`${
              isOpen ? "w-full mt-4" : "w-10 h-10 p-0 mx-auto mt-3"
            } px-3 py-2 text-sm font-medium text-orange-600 bg-white/80 backdrop-blur-sm hover:bg-white rounded-lg transition-colors shadow-sm hover:shadow duration-200`}
            onClick={() => logout()}
            disabled={isLoggingOut}
            title={isOpen ? "" : "로그아웃"}
          >
            {isOpen ? (
              isLoggingOut ? (
                "로그아웃 중..."
              ) : (
                "로그아웃"
              )
            ) : (
              <svg
                className="w-5 h-5 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            )}
          </Button>
        </div>
      </DashboardSidebar>

      {/* Main Content */}
      <main className="flex-1 relative z-10 overflow-y-auto">
        {/* 햄버거 메뉴 버튼 */}
        <button
          className="fixed top-4 left-4 z-50 md:hidden bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-md hover:bg-white transition-colors"
          onClick={toggle}
          aria-label="메뉴 열기"
        >
          <Menu size={24} className="text-orange-600" />
        </button>

        <div className="p-8 max-w-7xl mx-auto mt-12 md:mt-0">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
