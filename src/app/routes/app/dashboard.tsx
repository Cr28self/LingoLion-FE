import { Button } from "@/components/ui/button";
import ChatRoomCard from "@/features/dashboard/components/ChatRoomCard";
import DashboardSidebar from "@/features/dashboard/components/Dashboard-Sidebar";
import { TChatRoomCard } from "@/features/dashboard/types/types";
import { useLogout } from "@/lib/auth/hooks";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const DashboardRoute = () => {
  const { logout, isLoggingOut } = useLogout();
  // !나중에 API로부터 받아온 데이터로 대체
  const [chatRoomList, setChatRoomList] = useState<TChatRoomCard[] | null>([
    { chatId: "1", title: "공항 안내 데스크", icon: "👤", time: "2h ago" },
    { chatId: "2", title: "레스토랑 주문", icon: "🔄", time: "3h ago" },
    { chatId: "3", title: "카드 분실", icon: "💳", time: "4h ago" },
    { chatId: "4", title: "시간 약속 잡기", icon: "📅", time: "5h ago" },
  ]);
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}

      <DashboardSidebar>
        <nav className="flex-1">
          {["Overview", "Analytics", "Reports", "Settings"].map((item) => (
            <a
              key={item}
              href="#"
              className="flex items-center px-4 py-3 text-white hover:bg-orange-700 rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              {item}
            </a>
          ))}
        </nav>

        <div className="mt-auto border-t border-orange-500 pt-6">
          <div className="flex items-center px-4">
            <div className="shrink-0">
              <div className="w-10 h-10 bg-orange-300 rounded-full flex items-center justify-center">
                <span className="text-orange-800 font-semibold">TK</span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">SangHyun Oh</p>
              <p className="text-xs text-orange-200">cr28self@gmail.com</p>
            </div>
          </div>
          <Button
            className="w-full mt-4 px-4 py-2 text-sm text-orange-600 bg-white hover:bg-orange-50 rounded-lg transition-colors"
            onClick={() => logout()}
            disabled={isLoggingOut}
          >
            Logout
          </Button>
        </div>
      </DashboardSidebar>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Welcome to Lingo Lion Dashboard
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {["Active Users", "Total Sessions", "Conversion Rate", "Revenue"].map(
            (stat) => (
              <div
                key={stat}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-gray-500 text-sm mb-2">{stat}</h3>
                <p className="text-2xl font-bold text-orange-600">1,234</p>
                <div className="mt-4 h-1 bg-orange-100 rounded-full">
                  <div className="h-full bg-orange-600 rounded-full w-3/4" />
                </div>
              </div>
            )
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              채팅방 목록
            </h2>
            <Button>
              <Link to="/app/situation/new">시나리오 생성</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chatRoomList?.map(({ chatId, title, icon, time }) => (
              <ChatRoomCard
                chatId={chatId}
                key={title}
                title={title}
                icon={icon}
                time={time}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardRoute;
