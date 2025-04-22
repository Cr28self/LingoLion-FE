import CreateSituationLayout from '@/app/layouts/create-situation-layout.tsx';
import RecommendationModal from '@/features/situation-create/components/recommendation-modal.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import CreateSituationForm from '@/features/situation-create/components/create-situation-form.tsx';
import { useState } from 'react';
import useCreateSituationRouteStore from '@/features/situation-create/store/use-create-situation-route-store.ts';
import {
  ArrowLeft,
  ChevronRight,
  Edit3,
  Info,
  Sparkles,
  ThumbsUp,
} from 'lucide-react';
import AllRecommendButton from '@/features/situation-create/components/button/all-recommend-button';
import useRecommendationActions from '@/features/situation-create/hooks/use-recommendation-actions';
import useRecommendationListStore from '@/features/situation-create/store/use-recommendation-list-store';
import { toast } from 'sonner';
import useRecommendFormStore from '@/features/situation-create/store/use-recommend-form-store';

// --- 상황 생성 페이지 컴포넌트 (태그 스타일 및 레이아웃 개선) ---
export default function CreateSituationPage() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1); // 1: 주제 입력, 2: 세부 설정

  const [topicInput, setTopicInput] = useState('');
  const location = useLocation();
  const { metaData } = location.state || {}; // state에서 데이터 가져오기

  const setCreateSituationRouteData = useCreateSituationRouteStore(
    (state) => state.setCreateSituationRouteData
  );

  const { isPending, handleAllRecommend } = useRecommendationActions();

  // ! 전체 리스트 저장
  const setAllRecList = useRecommendationListStore(
    (state) => state.setAllRecList
  );

  // ! 단순히 길이만 받아올건데 이렇게 정의하는게 맞나???
  const allRecCategoryList = useRecommendationListStore(
    (state) => state.allRecCategoryList
  );

  // ! 모달 on/off
  const setIsModalOpen = useRecommendFormStore((state) => state.setIsModalOpen);

  const handleGoToStep2 = () => {
    if (!topicInput.trim()) {
      alert('대화하고 싶은 상황이나 주제를 입력해주세요.');
      return;
    }

    setCreateSituationRouteData({
      metaData,
      completeRedirectLink: '/app/my-situations',
    });
    setCurrentStep(2);
  };

  return (
    <CreateSituationLayout>
      {/* 메인 컨텐츠 카드 */}
      <div className="mx-auto max-w-3xl rounded-xl border border-border bg-card p-6 shadow-xl md:p-8">
        <div className="mb-8 flex items-center">
          {/* 1단계에서는 뒤로가기, 2단계에서는 Step 1로 돌아가기 */}
          <button
            onClick={() =>
              currentStep === 1 ? navigate(-1) : setCurrentStep(1)
            }
            className="mr-3 rounded-full p-2 text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
            aria-label={currentStep === 1 ? '뒤로가기' : '이전 단계로'}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            {currentStep === 1 ? '새 대화 시작하기' : '대화 세부 설정'}
          </h1>
        </div>

        {/* 1단계: 주제 입력 */}
        {currentStep === 1 && (
          <div className="animate-fadeIn">
            <label
              htmlFor="topic-input"
              className="mb-3 block flex items-center text-lg font-semibold text-foreground"
            >
              <Sparkles
                className="mr-2 h-5 w-5 text-primary"
                strokeWidth={2.5}
              />{' '}
              1단계: 대화 주제 입력
            </label>
            <textarea
              id="topic-input"
              rows={4} // 행 늘림
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              placeholder="어떤 상황에서 대화하고 싶으신가요? 구체적으로 적을수록 AI 추천이 정확해집니다.\n예: 공항에서 비행기 체크인하기, 친구와 저녁 식사 메뉴 정하기, 영어 면접 자기소개 연습"
              className="mb-4 block w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-foreground placeholder-muted-foreground transition duration-150 focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring sm:text-sm"
            />
            <p className="mb-5 mt-1.5 flex items-center text-xs text-muted-foreground">
              <Info className="mr-1 h-3 w-3" /> 다음 단계에서 AI가 장소, 역할
              등을 추천해줄 거예요!
            </p>
            <div className="text-center">
              <button
                onClick={handleGoToStep2}
                disabled={!topicInput.trim()}
                className={`inline-flex items-center justify-center rounded-lg border border-transparent bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-sm transition-all duration-300 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60`}
              >
                다음: 세부 설정하기
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* 2단계: 세부 설정 */}
        {currentStep === 2 && (
          <div className="animate-fadeIn">
            {/* 상황 생성 폼 */}
            <div className="mb-6 rounded-lg border border-border bg-muted/50 p-4">
              <p className="mb-1 text-sm font-medium text-foreground">
                입력된 주제:
              </p>
              <p className="text-sm text-muted-foreground">{topicInput}</p>
              <button
                onClick={() => setCurrentStep(1)}
                className="mt-1 inline-flex items-center text-xs text-primary hover:underline"
              >
                <Edit3 className="mr-1 h-3 w-3" /> 주제 수정하기
              </button>
            </div>

            <div className="mb-5 flex items-center justify-between">
              <h2 className="mb-5 flex items-center text-lg font-semibold text-foreground">
                <ThumbsUp
                  className="mr-2 h-5 w-5 text-green-600"
                  strokeWidth={2.5}
                />{' '}
                2단계: AI 추천 및 직접 설정
              </h2>

              <AllRecommendButton
                isPending={isPending}
                allRecCategoryListLength={allRecCategoryList.length}
                onNotYetAllRecommended={() =>
                  handleAllRecommend({
                    onSuccessCallback: (result) => {
                      setAllRecList(result.data);
                      const { allRecCategoryList } =
                        useRecommendationListStore.getState();
                      if (allRecCategoryList.length < 5) {
                        // 모달 최초로 open
                        setIsModalOpen(true);
                      }

                      toast.success('전체 추천이 완료되었습니다.');
                    },

                    onErrorCallback: () => {
                      toast.error('전체 추천 중 에러 발생');
                    },
                  })
                }
                onAlreadyAllRecommended={() => setIsModalOpen(true)}
              />
            </div>

            <CreateSituationForm />
          </div>
        )}
      </div>
      {/* 추천 모달 */}
      <RecommendationModal />
    </CreateSituationLayout>
  );
}
