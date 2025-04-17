// src/pages/MyScenariosPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// lucide-react 아이콘 임포트
import {
  FolderKanban,
  PlusCircle,
  MessageSquareText,
  Edit3,
  Trash2,
  Info,
  FolderOpen,
  Bot,
  User,
  MapPin,
  Target,
} from 'lucide-react';

// 가상 데이터: 사용자가 저장한 시나리오 목록 (API 응답 대체)
// 실제 데이터에는 title 외에도 place, aiRole, userRole, goal 등이 포함될 수 있음
const mockUserScenarios = [
  {
    id: 'us1',
    topic: '주말 영화 계획 세우기', // NewConversationSetupPage에서 사용자가 입력한 주제
    place: '전화 통화 (Phone Call)',
    aiRole: '친구 (Friend)',
    userRole: '나 (Me)',
    goal: '이번 주말에 볼 영화 확정하기 (Decide on a movie for this weekend)',
    createdAt: '2023-10-26',
  },
  {
    id: 'us2',
    topic: '새 프로젝트 아이디어 발표',
    place: '팀 회의실 (Team Meeting Room)',
    aiRole: '팀장 및 동료들 (Team Lead and Colleagues)',
    userRole: '발표자 (Presenter)',
    goal: '프로젝트 제안 승인 받기 (Get approval for the project proposal)',
    createdAt: '2023-10-24',
  },
  {
    id: 'us3',
    topic: '호텔 룸서비스 요청',
    place: '호텔 객실 (Hotel Room)',
    aiRole: '호텔 직원 (Hotel Staff)',
    userRole: '투숙객 (Guest)',
    goal: '저녁 식사 주문하기 (Order dinner via room service)',
    createdAt: '2023-10-20',
  },
  // ... 다른 저장된 시나리오
];

function MyScenariosPage() {
  const [scenarios, setScenarios] = useState(mockUserScenarios);
  const navigate = useNavigate();

  // 대화 시작 핸들러 (모달 띄우거나 바로 이동)
  const handleStartConversation = (scenario) => {
    console.log('Starting conversation-session with scenario:', scenario);
    // TODO: 여기서 설정 확인 모달(난이도 등)을 띄우고,
    // 백엔드에 scenario 정보를 보내 대화 세션을 생성한 후
    // navigate(`/app/conversation-session/${newSessionId}`); 로 이동
    alert(
      `'${scenario.topic}' 상황으로 대화 시작 준비!\n(실제로는 난이도 등 설정 모달 후 대화 페이지로 이동합니다.)`
    );
  };

  // 시나리오 수정 핸들러 (수정 페이지로 이동)
  const handleEditScenario = (scenarioId) => {
    console.log('Editing scenario:', scenarioId);
    // TODO: 수정 페이지 구현 시 해당 페이지로 이동
    // navigate(`/app/edit-scenario/${scenarioId}`); // 예시 경로
    alert(`시나리오 ${scenarioId} 수정 기능 구현 필요`);
  };

  // 시나리오 삭제 핸들러 (확인 후 삭제)
  const handleDeleteScenario = (scenarioId, scenarioTopic) => {
    if (window.confirm(`'${scenarioTopic}' 상황을 정말 삭제하시겠습니까?`)) {
      console.log('Deleting scenario:', scenarioId);
      // TODO: API 호출하여 서버에서 삭제
      setScenarios((prev) => prev.filter((s) => s.id !== scenarioId)); // UI에서 즉시 제거 (API 성공 후 실행)
      alert(`시나리오 '${scenarioTopic}' 삭제 완료 (실제로는 API 호출 필요)`);
    }
  };

  return (
    // 배경 그라데이션 적용
    <div className="min-h-screen bg-gradient-to-b from-background via-orange-50 to-red-50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        {/* 페이지 헤더 */}
        <div className="mb-8 md:flex md:items-center md:justify-between">
          <h1 className="mb-4 flex items-center text-3xl font-bold text-foreground md:mb-0 md:text-4xl">
            <FolderKanban
              className="mr-3 h-8 w-8 text-primary"
              strokeWidth={2}
            />
            나의 저장된 상황 목록
          </h1>
          {/* 새 상황 만들기 버튼 */}
          <Link
            to="/app/new-conversation"
            className="inline-flex items-center justify-center rounded-lg border border-transparent bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition duration-300 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <PlusCircle className="mr-2 h-5 w-5" strokeWidth={2.5} />새 상황
            만들기
          </Link>
        </div>

        {/* 저장된 시나리오 목록 또는 빈 상태 메시지 */}
        {scenarios.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {scenarios.map((scenario) => (
              <div
                key={scenario.id}
                // 카드 디자인: 배경, 그림자, 테두리, 호버 효과
                className="group flex flex-col rounded-xl border border-border bg-card shadow-lg transition duration-300 ease-in-out hover:border-primary/30 hover:shadow-xl"
              >
                {/* 카드 내용 */}
                <div className="flex-grow p-5">
                  {/* 주제 */}
                  <h3 className="mb-3 line-clamp-2 text-lg font-semibold text-foreground transition duration-200 group-hover:text-primary">
                    {scenario.topic || '제목 없는 상황'}
                  </h3>

                  {/* 세부 설정 정보 (아이콘과 함께 표시) */}
                  <div className="mb-4 space-y-1.5 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 flex-shrink-0 text-primary/70" />
                      <span>{scenario.place || '-'}</span>
                    </div>
                    <div className="flex items-center">
                      <Bot className="mr-2 h-4 w-4 flex-shrink-0 text-primary/70" />
                      <span>AI: {scenario.aiRole || '-'}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4 flex-shrink-0 text-primary/70" />
                      <span>나: {scenario.userRole || '-'}</span>
                    </div>
                    <div className="flex items-center">
                      <Target className="mr-2 h-4 w-4 flex-shrink-0 text-primary/70" />
                      <span>목표: {scenario.goal || '-'}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground/80">
                    저장일: {scenario.createdAt || '알 수 없음'}
                  </p>
                </div>

                {/* 카드 하단 액션 버튼 */}
                <div className="mt-auto flex items-center justify-between border-t border-border bg-muted/30 p-4">
                  {/* 대화 시작 버튼 (주요 액션) */}
                  <button
                    onClick={() => handleStartConversation(scenario)}
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition duration-300 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
                  >
                    <MessageSquareText
                      className="mr-2 h-4 w-4"
                      strokeWidth={2.5}
                    />
                    대화 시작
                  </button>
                  {/* 수정 및 삭제 버튼 (보조 액션) */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditScenario(scenario.id)}
                      className="rounded-md p-2 text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
                      aria-label="상황 수정"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteScenario(scenario.id, scenario.topic)
                      }
                      className="rounded-md p-2 text-muted-foreground transition-colors duration-200 hover:bg-destructive/10 hover:text-destructive"
                      aria-label="상황 삭제"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // 빈 상태 UI
          <div className="mt-10 rounded-lg border border-border bg-card px-6 py-16 text-center shadow-md">
            <FolderOpen
              className="mx-auto mb-5 h-16 w-16 text-muted-foreground/50"
              strokeWidth={1}
            />
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              아직 저장된 상황이 없어요!
            </h3>
            <p className="mb-6 text-muted-foreground">
              자주 사용하는 대화 상황을 직접 만들고 저장해보세요.
            </p>
            <Link
              to="/app/test/new-conversation"
              className="inline-flex items-center rounded-lg border border-transparent bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-sm transition duration-300 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <PlusCircle className="mr-2 h-5 w-5" strokeWidth={2.5} />새 상황
              만들러 가기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyScenariosPage;
