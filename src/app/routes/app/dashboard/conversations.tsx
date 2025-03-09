import DashboardLayout from "@/components/layout/dashboard-layout";
import React from "react";

const DashboardConversationsRoute = () => {
  // 회화 목록 데이터 (나중에 API로 대체)
  const conversations = [
    {
      id: 1,
      title: "공항 안내 데스크",
      date: "2023-05-15",
      duration: "10분",
      score: 85,
    },
    {
      id: 2,
      title: "레스토랑 주문",
      date: "2023-05-14",
      duration: "15분",
      score: 92,
    },
    {
      id: 3,
      title: "카드 분실",
      date: "2023-05-12",
      duration: "8분",
      score: 78,
    },
    {
      id: 4,
      title: "시간 약속 잡기",
      date: "2023-05-10",
      duration: "12분",
      score: 88,
    },
    {
      id: 5,
      title: "호텔 예약",
      date: "2023-05-08",
      duration: "14분",
      score: 90,
    },
  ];

  return (
    <DashboardLayout>
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            회화 목록 <span className="text-orange-500">Conversations</span>
          </h1>
          <p className="text-gray-500 mt-1">
            모든 회화 기록을 확인하고 관리하세요.
          </p>
        </div>
      </header>

      {/* Conversations Content */}
      <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-sm border border-white/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            최근 회화 기록
          </h2>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="회화 검색..."
              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
            />
            <select className="px-3 py-1 border border-gray-300 rounded-md text-sm">
              <option>모든 날짜</option>
              <option>최근 7일</option>
              <option>최근 30일</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  제목
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  날짜
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  소요 시간
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  점수
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  액션
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {conversations.map((conversation) => (
                <tr key={conversation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {conversation.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {conversation.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {conversation.duration}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 mr-2">
                        {conversation.score}
                      </span>
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-orange-500 rounded-full"
                          style={{ width: `${conversation.score}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-orange-500 hover:text-orange-700 mr-3">
                      보기
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-1 rounded-md bg-white border border-gray-300 text-sm">
              이전
            </button>
            <button className="px-3 py-1 rounded-md bg-orange-500 text-white text-sm">
              1
            </button>
            <button className="px-3 py-1 rounded-md bg-white border border-gray-300 text-sm">
              2
            </button>
            <button className="px-3 py-1 rounded-md bg-white border border-gray-300 text-sm">
              3
            </button>
            <button className="px-3 py-1 rounded-md bg-white border border-gray-300 text-sm">
              다음
            </button>
          </nav>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardConversationsRoute;
