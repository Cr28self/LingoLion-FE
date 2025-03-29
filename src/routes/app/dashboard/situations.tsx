import DashboardLayout from "@/components/layout/dashboard-layout";
import SituationSetupModal from "@/domains/dashboard/components/modal/SituationSetupModal";
import SituationGrid from "@/domains/dashboard/components/SituationGrid";

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

      <SituationGrid />
    </DashboardLayout>
  );
};

export default DashboardSituationsRoute;
