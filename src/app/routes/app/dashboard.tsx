import { Button } from "@/components/ui/button";
import ChatRoomCard from "@/domains/dashboard/components/ChatRoomCard";
import DashboardSidebar from "@/domains/dashboard/components/Dashboard-Sidebar";
import SituationSetupModal from "@/domains/dashboard/components/modal/SituationSetupModal";
import { TChatRoomCard } from "@/domains/dashboard/types/types";
import { useLogout } from "@/lib/auth/hooks";
import React, { Suspense, useState } from "react";
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

  const stats = [
    {
      name: "Active Users",
      value: "1,234",
      percent: 75,
      icon: (
        <svg
          className="w-6 h-6 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      name: "Total Sessions",
      value: "5,678",
      percent: 65,
      icon: (
        <svg
          className="w-6 h-6 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      name: "Conversion Rate",
      value: "42%",
      percent: 80,
      icon: (
        <svg
          className="w-6 h-6 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
    },
    {
      name: "Revenue",
      value: "$9,876",
      percent: 90,
      icon: (
        <svg
          className="w-6 h-6 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

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
    },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-orange-50 to-orange-100 relative overflow-hidden">
      {/* Background blurred circles for glassmorphism effect */}
      <div className="absolute w-64 h-64 rounded-full bg-orange-300 filter blur-3xl opacity-20 -top-10 -left-10"></div>
      <div className="absolute w-96 h-96 rounded-full bg-orange-400 filter blur-3xl opacity-20 bottom-0 right-0"></div>
      <div className="absolute w-64 h-64 rounded-full bg-orange-200 filter blur-3xl opacity-20 top-1/3 right-1/4"></div>

      {/* Sidebar */}
      <DashboardSidebar>
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to="#"
              className="flex items-center px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors duration-200 backdrop-blur-sm group"
            >
              <span className="mr-3">{item.icon}</span>
              <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto border-t border-white/20 pt-6">
          <div className="flex items-center px-4">
            <div className="shrink-0">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">SH</span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">SangHyun Oh</p>
              <p className="text-xs text-orange-100">cr28self@gmail.com</p>
            </div>
          </div>
          <Button
            className="w-full mt-4 px-4 py-2 text-sm font-medium text-orange-600 bg-white/80 backdrop-blur-sm hover:bg-white rounded-lg transition-colors shadow-sm hover:shadow duration-200"
            onClick={() => logout()}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </Button>
        </div>
      </DashboardSidebar>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto relative z-10">
        <div className="max-w-7xl mx-auto">
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Welcome to <span className="text-orange-500">Lingo Lion</span>
              </h1>
              <p className="text-gray-500 mt-1">
                Here's what's happening with your account today.
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-500 hover:text-orange-500 bg-white/70 backdrop-blur-md rounded-lg shadow-sm hover:shadow transition-all duration-200">
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
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              <button className="p-2 text-gray-500 hover:text-orange-500 bg-white/70 backdrop-blur-md rounded-lg shadow-sm hover:shadow transition-all duration-200">
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
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </button>
            </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-white/50"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-gray-500 text-sm font-medium">
                    {stat.name}
                  </h3>
                  <div className="bg-orange-100/80 backdrop-blur-sm p-2 rounded-lg">
                    {stat.icon}
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                <div className="mt-4 h-2 bg-gray-100/70 backdrop-blur-sm rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"
                    style={{ width: `${stat.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* ConvCardList */}
          <div className="mb-8 bg-white/60 backdrop-blur-md p-6 rounded-xl shadow-sm border border-white/50"></div>

          {/* Recent Activity */}
          <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-sm border border-white/50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  채팅방 목록
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  최근 대화 목록입니다.
                </p>
              </div>

              <SituationSetupModal />
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
    </div>
  );
};

export default DashboardRoute;
