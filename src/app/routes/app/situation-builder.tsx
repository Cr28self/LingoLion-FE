import { useLocation, useNavigate } from "react-router-dom";
import SituationBuilderLayout from "@/components/layout/situation-builder-layout";
import { RecommendForm } from "@/features/situation-builder/components/RecommendForm";

// ---------- 메인 컴포넌트 ----------
export default function SituationRoute() {
  const location = useLocation();
  const { metaData } = location.state || {}; // state에서 데이터 가져오기

  const navigate = useNavigate();

  // ---------- UI ----------
  return (
    <SituationBuilderLayout>
      <div className="px-2.5 h-full flex flex-col overflow-y-hidden">
        {/* 메인 컨텐츠 박스 */}
        <div
          className="
            p-4 bg-white/90 mt-4 mb-4 
            flex flex-col justify-between 
            border border-orange-200 
            rounded-xl shadow-lg
            flex-grow overflow-y-auto
         
          "
        >
          <RecommendForm
            metaData={metaData}
            onCompleteNavigate={() => navigate("/app/dashboard")}
          />
        </div>
      </div>
    </SituationBuilderLayout>
  );
}
