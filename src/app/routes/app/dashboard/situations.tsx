import DashboardLayout from "@/components/layout/dashboard-layout";
import { SkeletonCardSitu } from "@/components/loading/SkeletonCardLoading";
import { Button } from "@/components/ui/button";
import SituationSetupModal from "@/domains/dashboard/components/modal/SituationSetupModal";
import SituationGrid from "@/domains/dashboard/components/SituationGrid";
import { Suspense, useState } from "react";

const DashboardSituationsRoute = () => {
  // 상황 목록 데이터 (나중에 API로 대체)

  //   ! 약간 라우팅 ( 링크 ) 위주로ㄱㄱㄱㄱ

  const [state, setState] = useState<"all" | "my">("all");

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
          <div className="p-1 bg-gray-100/80 rounded-lg">
            <div className="flex items-center space-x-1">
              <Button
                variant={state === "all" ? "default" : "ghost"}
                onClick={() => setState("all")}
                className={`
                  relative px-6 py-2 transition-all duration-200
                  ${
                    state === "all"
                      ? "bg-white text-orange-600 shadow-sm hover:bg-white/90"
                      : "hover:bg-white/50 text-gray-600"
                  }
                `}
              >
                <span className="font-medium">전체 상황 목록</span>
                {state === "all" && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-200 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-400"></span>
                  </span>
                )}
              </Button>
              <Button
                variant={state === "my" ? "default" : "ghost"}
                onClick={() => setState("my")}
                className={`
                  relative px-6 py-2 transition-all duration-200
                  ${
                    state === "my"
                      ? "bg-white text-orange-600 shadow-sm hover:bg-white/90"
                      : "hover:bg-white/50 text-gray-600"
                  }
                `}
              >
                <span className="font-medium">내 상황 목록</span>
                {state === "my" && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-200 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-400"></span>
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>

        <Suspense fallback={<SkeletonCardSitu />}>
          {state === "all" && <SituationGrid mode="all" />}
          {state === "my" && <SituationGrid mode="my" />}
        </Suspense>
      </div>
    </DashboardLayout>
  );
};

export default DashboardSituationsRoute;
