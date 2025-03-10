import DashboardLayout from "@/components/layout/dashboard-layout";
import SituationSetupModal from "@/domains/dashboard/components/modal/SituationSetupModal";
import SituationGrid from "@/domains/dashboard/components/SituationGrid";
import { Suspense } from "react";

const DashboardSituationsRoute = () => {
  // 상황 목록 데이터 (나중에 API로 대체)

  //   ! 약간 라우팅 ( 링크 ) 위주로ㄱㄱㄱㄱ

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
        <SituationSetupModal onNextLink={"/app/situation/new"} />
      </header>

      {/* Situations Grid */}

      <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-sm border border-white/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">상황 목록</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="상황 검색..."
              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
            />
            <select className="px-3 py-1 border border-gray-300 rounded-md text-sm">
              <option>모든 카테고리</option>
              <option>여행</option>
              <option>식당</option>
              <option>쇼핑</option>
              <option>의료</option>
            </select>
          </div>
        </div>
        <Suspense fallback={<div>loading.......</div>}>
          <SituationGrid onMakeSuccessLink={"/app/dashboard/conversations"} />
        </Suspense>
      </div>
    </DashboardLayout>
  );
};

export default DashboardSituationsRoute;
