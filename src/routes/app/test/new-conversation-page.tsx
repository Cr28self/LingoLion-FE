// src/pages/NewConversationSetupPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// lucide-react 아이콘 임포트
import {
  ArrowLeft,
  ChevronRight,
  Info,
  Sparkles,
  Bot,
  User,
  MapPin,
  Target,
  Edit3,
  Loader2,
  Wand,
  ThumbsUp,
} from 'lucide-react';

// AI 추천 시뮬레이션 함수 (필드 지정 가능)
const getAiRecommendations = async (topic, field = 'all') => {
  console.log(`AI에게 추천 요청: Topic='${topic}', Field='${field}'`);
  await new Promise((resolve) =>
    setTimeout(resolve, field === 'all' ? 1500 : 800)
  ); // 전체 추천은 더 오래 걸리는 척

  // 기본 추천 값
  const baseRecs = {
    place: '카페 (Cafe)',
    aiRole: '바리스타 (Barista)',
    userRole: '손님 (Customer)',
    goal: '커피 주문하기 (Order coffee)',
  };

  // 주제 기반 약간의 변형 (예시)
  if (
    topic.toLowerCase().includes('공항') ||
    topic.toLowerCase().includes('check-in')
  ) {
    baseRecs.place = '공항 체크인 카운터 (Airport Check-in Counter)';
    baseRecs.aiRole = '항공사 직원 (Airline Staff)';
    baseRecs.userRole = '승객 (Passenger)';
    baseRecs.goal = '탑승 수속 완료 (Complete check-in)';
  } else if (
    topic.toLowerCase().includes('면접') ||
    topic.toLowerCase().includes('interview')
  ) {
    baseRecs.place = '면접실 (Interview Room)';
    baseRecs.aiRole = '면접관 (Interviewer)';
    baseRecs.userRole = '지원자 (Applicant)';
    baseRecs.goal =
      '자기소개 및 강점 어필 (Introduce self and highlight strengths)';
  }

  if (field === 'all') {
    return baseRecs;
  } else if (baseRecs[field]) {
    // 특정 필드만 반환
    return { [field]: baseRecs[field] };
  } else {
    // 요청된 필드가 없으면 빈 객체 반환 (오류 처리)
    return {};
  }
};

// 각 필드 설정 컴포넌트
const EditableField = ({
  fieldKey,
  label,
  icon: Icon,
  value,
  onRecommend,
  onUpdate,
  isLoading,
  isEditing,
  onEditStart,
  onEditEnd,
}) => {
  return (
    <div className="group relative flex items-start space-x-3 rounded-lg border border-border bg-background p-4">
      <Icon
        className="mt-1 h-5 w-5 flex-shrink-0 text-primary"
        strokeWidth={2}
      />
      <div className="min-w-0 flex-grow">
        {' '}
        {/* min-w-0 for proper text wrapping */}
        <label className="mb-1 block text-xs font-medium text-muted-foreground">
          {label}
        </label>
        {isEditing ? (
          <input
            type="text"
            value={value}
            onChange={(e) => onUpdate(fieldKey, e.target.value)}
            onBlur={onEditEnd}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onEditEnd();
            }}
            className="block w-full border-b border-primary bg-transparent px-1 py-0.5 text-sm text-foreground focus:outline-none"
            autoFocus
          />
        ) : (
          <div className="flex items-center justify-between">
            <span
              className={`cursor-pointer break-words text-sm text-foreground ${!value ? 'italic text-muted-foreground' : ''}`}
              onClick={() => onEditStart(fieldKey)}
            >
              {value || `(${label} 입력/추천 필요)`}
            </span>
            <button
              onClick={() => onEditStart(fieldKey)}
              className="ml-2 flex-shrink-0 rounded p-1 opacity-0 transition-opacity duration-150 hover:bg-muted group-hover:opacity-100"
              aria-label={`${label} 수정`}
            >
              <Edit3 className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        )}
      </div>
      {/* 개별 추천 버튼 */}
      <button
        onClick={() => onRecommend(fieldKey)}
        disabled={isLoading}
        className="absolute right-3 top-3 rounded-full bg-primary/10 p-1.5 text-primary transition-colors duration-150 hover:bg-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label={`${label} 추천받기`}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Wand className="h-4 w-4" strokeWidth={2.5} />
        )}
      </button>
    </div>
  );
};

function NewConversationSetupPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1); // 1: 주제 입력, 2: 세부 설정
  const [topicInput, setTopicInput] = useState('');
  const [fields, setFields] = useState({
    place: '',
    aiRole: '',
    userRole: '',
    goal: '',
  });
  const [isLoading, setIsLoading] = useState({
    all: false,
    place: false,
    aiRole: false,
    userRole: false,
    goal: false,
  });
  const [editingField, setEditingField] = useState(null);

  // 1단계 -> 2단계 진행
  const handleGoToStep2 = () => {
    if (!topicInput.trim()) {
      alert('대화하고 싶은 상황이나 주제를 입력해주세요.');
      return;
    }
    setCurrentStep(2);
  };

  // 로딩 상태 설정 헬퍼 함수
  const setLoadingState = (key, value) => {
    setIsLoading((prev) => ({ ...prev, [key]: value }));
  };

  // 전체 추천 핸들러
  const handleRecommendAll = async () => {
    setLoadingState('all', true);
    try {
      const recs = await getAiRecommendations(topicInput, 'all');
      setFields((prev) => ({ ...prev, ...recs })); // 추천 결과로 필드 업데이트
      setEditingField(null); // 수정 중이었다면 완료 처리
    } catch (error) {
      console.error('AI 전체 추천 실패:', error);
      alert('AI 전체 추천 중 오류가 발생했습니다.');
    } finally {
      setLoadingState('all', false);
    }
  };

  // 개별 필드 추천 핸들러
  const handleRecommendField = async (fieldKey) => {
    setLoadingState(fieldKey, true);
    try {
      const rec = await getAiRecommendations(topicInput, fieldKey);
      if (rec[fieldKey]) {
        setFields((prev) => ({ ...prev, [fieldKey]: rec[fieldKey] }));
        setEditingField(null); // 수정 중이었다면 완료 처리
      } else {
        console.warn(`AI가 '${fieldKey}' 필드를 추천하지 못했습니다.`);
        // Optionally provide feedback to the user
      }
    } catch (error) {
      console.error(`AI ${fieldKey} 추천 실패:`, error);
      alert(`AI ${fieldKey} 추천 중 오류가 발생했습니다.`);
    } finally {
      setLoadingState(fieldKey, false);
    }
  };

  // 필드 값 업데이트 핸들러 (수동 입력)
  const handleUpdateField = (fieldKey, value) => {
    setFields((prev) => ({ ...prev, [fieldKey]: value }));
  };

  // 수정 완료 핸들러
  const handleFinishEditing = () => {
    setEditingField(null);
  };

  // 최종 진행 핸들러
  const handleProceed = () => {
    const finalSetup = { topic: topicInput, ...fields };
    if (Object.values(finalSetup).some((val) => !val?.trim())) {
      alert('모든 설정 항목을 확인하고 입력해주세요.');
      return;
    }
    console.log('Proceeding with final setup:', finalSetup);
    alert(
      `최종 설정 완료!\n${JSON.stringify(finalSetup, null, 2)}\n\n(실제로는 대화 설정 모달 후 대화 페이지로 이동합니다.)`
    );
    // navigate(`/app/conversation-session/${newSessionId}`);
  };

  // 진행 버튼 활성화 조건
  const isProceedEnabled =
    currentStep === 2 && Object.values(fields).every((val) => !!val?.trim());
  const isAnyLoading = Object.values(isLoading).some((val) => val === true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-orange-50 to-red-50 p-6 md:p-10">
      <div className="mx-auto max-w-3xl rounded-xl border border-border bg-card p-6 shadow-xl md:p-8">
        {/* 헤더 */}
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

        {/* 2단계: 세부 설정 (AI 추천 및 수정) */}
        {currentStep === 2 && (
          <div className="animate-fadeIn">
            {/* 입력된 주제 표시 */}
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
              <h2 className="flex items-center text-lg font-semibold text-foreground">
                <ThumbsUp
                  className="mr-2 h-5 w-5 text-green-600"
                  strokeWidth={2.5}
                />{' '}
                2단계: AI 추천 및 직접 설정
              </h2>
              {/* 전체 추천 버튼 */}
              <button
                onClick={handleRecommendAll}
                disabled={isLoading.all || isAnyLoading} // 개별 로딩 중에도 비활성화
                className="inline-flex items-center rounded-md border border-primary/50 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors duration-200 hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading.all ? (
                  <Loader2 className="-ml-1 mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" strokeWidth={2.5} />
                )}
                전체 추천받기
              </button>
            </div>

            {/* 각 필드 설정 영역 */}
            <div className="mb-8 space-y-4">
              <EditableField
                fieldKey="place"
                label="📍 장소 (Place)"
                icon={MapPin}
                value={fields.place}
                onRecommend={handleRecommendField}
                onUpdate={handleUpdateField}
                isLoading={isLoading.place}
                isEditing={editingField === 'place'}
                onEditStart={setEditingField}
                onEditEnd={handleFinishEditing}
              />
              <EditableField
                fieldKey="aiRole"
                label="🤖 AI 역할 (AI Role)"
                icon={Bot}
                value={fields.aiRole}
                onRecommend={handleRecommendField}
                onUpdate={handleUpdateField}
                isLoading={isLoading.aiRole}
                isEditing={editingField === 'aiRole'}
                onEditStart={setEditingField}
                onEditEnd={handleFinishEditing}
              />
              <EditableField
                fieldKey="userRole"
                label="👤 내 역할 (Your Role)"
                icon={User}
                value={fields.userRole}
                onRecommend={handleRecommendField}
                onUpdate={handleUpdateField}
                isLoading={isLoading.userRole}
                isEditing={editingField === 'userRole'}
                onEditStart={setEditingField}
                onEditEnd={handleFinishEditing}
              />
              <EditableField
                fieldKey="goal"
                label="🎯 대화 목표 (Goal)"
                icon={Target}
                value={fields.goal}
                onRecommend={handleRecommendField}
                onUpdate={handleUpdateField}
                isLoading={isLoading.goal}
                isEditing={editingField === 'goal'}
                onEditStart={setEditingField}
                onEditEnd={handleFinishEditing}
              />
            </div>

            <p className="mb-6 flex items-center justify-center text-center text-xs text-muted-foreground">
              <Wand className="mr-1 h-3 w-3" /> 버튼으로 추천받거나,{' '}
              <Edit3 className="mx-1 h-3 w-3" /> 아이콘/텍스트 클릭하여 직접
              수정하세요.
            </p>

            {/* 최종 진행 버튼 */}
            <div className="text-center">
              <button
                onClick={handleProceed}
                disabled={!isProceedEnabled || isAnyLoading || editingField}
                className={`inline-flex items-center justify-center rounded-lg border border-transparent bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-sm transition-all duration-300 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${isProceedEnabled && !isAnyLoading && !editingField ? 'animate-pulse' : ''}`}
              >
                설정 완료! 대화 시작 준비
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
              {!isProceedEnabled && !isAnyLoading && !editingField && (
                <p className="mt-2 text-xs text-muted-foreground">
                  모든 항목이 채워져야 대화를 시작할 수 있습니다.
                </p>
              )}
              {(isAnyLoading || editingField) && (
                <p className="mt-2 text-xs text-muted-foreground">
                  {isAnyLoading
                    ? 'AI 추천 또는 수정 중입니다...'
                    : `'${editingField}' 항목 수정을 완료해주세요.`}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewConversationSetupPage;
