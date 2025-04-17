import CreateSituationLayout from '@/app/layouts/create-situation-layout.tsx';
import RecommendationModal from '@/features/situation-create/components/recommendation-modal.tsx';
import { useLocation } from 'react-router-dom';
import CreateSituationForm from '@/features/situation-create/components/create-situation-form.tsx';
import { useEffect } from 'react';
import useCreateSituationRouteStore from '@/features/situation-create/store/use-create-situation-route-store.ts';

// ! SituationCreatePage에서 전체 추천 --> 결과가 RecommendationModal에 들어감
// ! 전체 추천 렌더링 결과물, 재추천 mutate함수, isOpen, 항목 선택시 formInputState 수정되는 함수

// --- 상황 생성 페이지 컴포넌트 (태그 스타일 및 레이아웃 개선) ---
export default function CreateSituationPage() {
  const location = useLocation();
  const { metaData } = location.state || {}; // state에서 데이터 가져오기

  const setCreateSituationRouteData = useCreateSituationRouteStore(
    (state) => state.setCreateSituationRouteData
  );

  useEffect(() => {
    setCreateSituationRouteData({
      metaData,
      completeRedirectLink: '/app/dashboard/situations',
    });
  }, []);

  return (
    <CreateSituationLayout>
      {/* 메인 컨텐츠 카드 */}
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-xl md:p-8">
        <CreateSituationForm />
      </div>
      {/* 추천 모달 */}
      <RecommendationModal />
    </CreateSituationLayout>
  );
}
