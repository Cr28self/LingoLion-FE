import DashboardLayout from "@/components/layout/dashboard-layout";
import ChatRoomCard from "@/domains/dashboard/components/ChatRoomCard";
import SituationSetupModal from "@/domains/dashboard/components/modal/SituationSetupModal";
import { TChatRoomCard } from "@/domains/dashboard/types/types";
import React, { Suspense, useState } from "react";

const DashboardOverviewRoute = () => {
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
    // ... 다른 stats 항목들
  ];

  return (
    <DashboardLayout>
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
              <h3 className="text-gray-500 text-sm font-medium">{stat.name}</h3>
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
            <h2 className="text-xl font-semibold text-gray-800">채팅방 목록</h2>
            <p className="text-sm text-gray-500 mt-1">최근 대화 목록입니다.</p>
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
    </DashboardLayout>
  );
};

export default DashboardOverviewRoute;
