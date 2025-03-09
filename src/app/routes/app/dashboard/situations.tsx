import DashboardLayout from "@/components/layout/dashboard-layout";
import SituationSetupModal from "@/domains/dashboard/components/SituationSetupModal";
import React from "react";

const DashboardSituationsRoute = () => {
  // 상황 목록 데이터 (나중에 API로 대체)
  const situations = [
    {
      id: 1,
      title: "공항 체크인",
      level: "초급",
      category: "여행",
    },
    {
      id: 2,
      title: "레스토랑 주문",
      level: "초급",
      category: "식당",
    },
    {
      id: 3,
      title: "호텔 체크인",
      level: "초급",
      category: "여행",
    },
    {
      id: 4,
      title: "길 찾기",
      level: "중급",
      category: "여행",
    },
    {
      id: 5,
      title: "쇼핑하기",
      level: "중급",
      category: "쇼핑",
    },
    {
      id: 6,
      title: "병원 방문",
      level: "고급",
      category: "의료",
    },
  ];

  return (
    <DashboardLayout>
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            상황 목록 <span className="text-orange-500">Situations</span>
          </h1>
          <p className="text-gray-500 mt-1">
            다양한 상황별 회화 연습을 시작하세요.
          </p>
        </div>
        <SituationSetupModal />
      </header>

      {/* Situations Grid */}
      <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-sm border border-white/50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {situations.map((situation) => (
            <div
              key={situation.id}
              className="bg-white/80 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-orange-100"
            >
              <h3 className="font-medium text-lg text-gray-800">
                {situation.title}
              </h3>
              <div className="flex mt-2 space-x-2">
                <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded text-xs">
                  {situation.level}
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs">
                  {situation.category}
                </span>
              </div>
              <div className="mt-4 flex justify-end">
                <button className="px-3 py-1 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600 transition-colors">
                  시작하기
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardSituationsRoute;
