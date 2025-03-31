import CreateSituationLayout from "@/components/layout/ccreate-situation-layout";
import RecommendationModal from "@/domains/situation-create/components/recommendation-modal";
import { useLocation, useNavigate } from "react-router-dom";
import CreateSituationForm from "@/domains/situation-create/components/create-situation-form";

// ! SituationCreatePage에서 전체 추천 --> 결과가 RecommendationModal에 들어감
// ! 전체 추천 렌더링 결과물, 재추천 mutate함수, isOpen, 항목 선택시 formInputState 수정되는 함수

// --- 상황 생성 페이지 컴포넌트 (태그 스타일 및 레이아웃 개선) ---
const SituationCreatePage = () => {
  const location = useLocation();
  const { metaData } = location.state || {}; // state에서 데이터 가져오기

  const navigate = useNavigate();

  return (
    <CreateSituationLayout>
      {/* 메인 컨텐츠 카드 */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <CreateSituationForm />
      </div>

      {/* 추천 모달 */}

      <RecommendationModal />

      {/* 스크롤바 스타일 (선택적, tailwind-scrollbar 플러그인 필요) */}
      <style jsx global>{`
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #fdba74 #fed7aa;
        } /* thumb track */
        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #fed7aa;
          border-radius: 3px;
        } /* orange-100 */
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #fdba74;
          border-radius: 3px;
        } /* orange-300 */
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: #fb923c;
        } /* orange-400 */
      `}</style>
    </CreateSituationLayout>
  );
};

export default SituationCreatePage;
