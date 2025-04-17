// src/pages/ExploreScenariosPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// lucide-react 아이콘 임포트
import {
  Search,
  Tag,
  SlidersHorizontal,
  PlusCircle,
  ArrowRight,
  Frown,
  Check,
  MessageSquareText,
} from 'lucide-react'; // Check, MessageSquareText 추가

// 가상 데이터 (이미지 URL 유지)
const scenarios = [
  {
    id: 's1',
    title: '공항에서 체크인하기',
    description: '비행기 탑승 전 항공사 카운터 직원과 대화하는 상황입니다.',
    category: '여행',
    difficulty: '중급',
    popularity: 150,
    imageUrl:
      'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 's2',
    title: '레스토랑에서 음식 주문하기',
    description: '웨이터에게 원하는 메뉴를 주문하고 요청사항을 전달합니다.',
    category: '일상',
    difficulty: '초급',
    popularity: 230,
    imageUrl:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
  },
  {
    id: 's3',
    title: '새로운 직장 동료와 첫인사',
    description: '회사에 새로 온 동료와 가볍게 인사를 나누는 상황입니다.',
    category: '비즈니스',
    difficulty: '초급',
    popularity: 180,
    imageUrl:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
  },
  {
    id: 's4',
    title: '호텔 예약 변경 요청하기',
    description: '전화로 호텔 리셉션에 예약 날짜 변경을 요청합니다.',
    category: '여행',
    difficulty: '중급',
    popularity: 95,
    imageUrl:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    id: 's5',
    title: '기술 면접 질문 답변하기',
    description: '면접관의 기술 관련 질문에 영어로 답변하는 연습을 합니다.',
    category: '면접',
    difficulty: '고급',
    popularity: 120,
    imageUrl:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
  },
];

// 대화 시작 버튼 클릭 핸들러 (실제로는 모달 띄우기)
const handleStartConversation = (scenarioId, scenarioTitle) => {
  // 예시: 난이도 설정 등 모달을 띄운다고 가정
  alert(
    `'${scenarioTitle}' 상황 시작 준비! (난이도 등 설정 모달 필요)\nID: ${scenarioId}`
  );
  // 실제 구현: 모달 라이브러리 사용 및 상태 관리
  // navigate(`/app/conversation-session/${newSessionId}`);
};

// 난이도별 스타일 반환 함수 (테마 색상과 조화롭게)
const getDifficultyBadgeStyle = (difficulty) => {
  switch (difficulty) {
    // 초록 계열 유지 (약간 톤 다운)
    case '초급':
      return 'bg-green-100 text-green-700 border border-green-200';
    // 노랑 계열 유지 (약간 톤 다운)
    case '중급':
      return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
    // 빨강 계열 유지 (Primary와 겹치지 않게 Destructive 색상 활용 고려 또는 다른 빨강톤)
    case '고급':
      return 'bg-red-100 text-red-700 border border-red-200'; // 또는 bg-destructive/10 text-destructive
    default:
      return 'bg-muted text-muted-foreground border-border';
  }
};

function ExploreScenariosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedScenario, setSelectedScenario] = useState(null); // 선택된 시나리오 상태 추가

  const filteredScenarios = scenarios.filter((scenario) => {
    const matchesSearch =
      scenario.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scenario.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || scenario.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(scenarios.map((s) => s.category))];

  // 카테고리별 색상 매핑 (선택 사항, 시각적 구분 위해)
  const categoryColorMap = {
    여행: 'bg-blue-100 text-blue-800 border-blue-200',
    일상: 'bg-purple-100 text-purple-800 border-purple-200',
    비즈니스: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    면접: 'bg-pink-100 text-pink-800 border-pink-200',
    // ... 다른 카테고리 추가
  };
  const getCategoryBadgeStyle = (category) => {
    return (
      categoryColorMap[category] ||
      'bg-secondary text-secondary-foreground border-border'
    );
  };

  return (
    // 배경색 변경
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        {/* 페이지 헤더 */}
        <div className="mb-8 md:flex md:items-center md:justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
              상황 탐색하기
            </h1>
            <p className="text-lg text-muted-foreground">
              다양한 상황 속에서 영어 회화를 연습해보세요!
            </p>
          </div>
          {/* 나만의 상황 만들기 버튼 - Primary 색상 적용 */}
          <Link
            to="/app/test/new-conversation"
            className="mt-4 inline-flex items-center justify-center rounded-lg border border-transparent bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-sm transition duration-300 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 md:mt-0"
          >
            <PlusCircle className="mr-2 h-5 w-5" strokeWidth={2.5} />
            나만의 상황 만들기
          </Link>
        </div>

        {/* 검색 및 필터 - 카드 스타일 적용 */}
        <div className="mb-10 rounded-lg border border-border bg-card p-5 shadow-md">
          <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-3">
            <div className="relative md:col-span-2">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search
                  className="h-5 w-5 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
              {/* 입력 필드 스타일 - Tailwind config의 input 변수 활용 */}
              <input
                type="text"
                placeholder="키워드로 검색해보세요 (예: 공항, 주문, 면접)"
                className="block w-full rounded-md border border-input bg-background py-3 pl-10 pr-4 leading-5 text-foreground placeholder-muted-foreground transition duration-150 ease-in-out focus:border-ring focus:placeholder-muted-foreground/80 focus:outline-none focus:ring-1 focus:ring-ring sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Tag
                  className="h-5 w-5 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
              <select
                // Select 스타일 통일
                className="block w-full appearance-none rounded-md border border-input bg-background py-3 pl-10 pr-10 leading-5 text-foreground transition duration-150 ease-in-out focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring sm:text-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? '전체 카테고리' : cat}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <SlidersHorizontal
                  className="h-5 w-5 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 상황 템플릿 목록 */}
        {filteredScenarios.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredScenarios.map((scenario) => (
              <div
                key={scenario.id}
                // 카드 스타일: 배경색, 그림자, 테두리, 호버 효과 개선
                className={`group flex transform cursor-pointer flex-col overflow-hidden rounded-xl border border-border bg-card shadow-lg transition duration-300 ease-in-out hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-2xl ${selectedScenario === scenario.id ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                onClick={() => setSelectedScenario(scenario.id)} // 카드 클릭 시 선택 상태 변경 (UX 개선)
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={scenario.imageUrl}
                    alt={scenario.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-500 ease-in-out group-hover:scale-110"
                  />
                  {/* 오버레이 그라데이션 조정 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  {/* 뱃지 디자인 개선 */}
                  <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getCategoryBadgeStyle(scenario.category)}`}
                    >
                      {scenario.category}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getDifficultyBadgeStyle(scenario.difficulty)}`}
                    >
                      {scenario.difficulty}
                    </span>
                  </div>
                </div>

                <div className="flex flex-grow flex-col justify-between p-5">
                  <div>
                    {/* 제목 호버 시 Primary 색상으로 */}
                    <h3 className="mb-1.5 line-clamp-2 text-lg font-semibold text-foreground transition duration-200 group-hover:text-primary">
                      {scenario.title}
                    </h3>
                    <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                      {scenario.description}
                    </p>
                  </div>
                  {/* 버튼: Primary 색상 적용, 그룹 호버 시 더 밝게 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
                      handleStartConversation(scenario.id, scenario.title);
                    }}
                    className={`mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm ${selectedScenario === scenario.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transform transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-hover:bg-primary/90`}
                  >
                    {/* MessageSquareText 아이콘으로 변경 */}
                    <MessageSquareText
                      className="mr-2 h-5 w-5"
                      strokeWidth={2}
                    />
                    대화 시작하기
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // 결과 없음 UI 개선
          <div className="rounded-lg border border-border bg-card px-6 py-16 text-center shadow-md">
            <Frown
              className="mx-auto mb-4 h-16 w-16 text-muted-foreground/50"
              strokeWidth={1.5}
            />
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              앗, 결과를 찾을 수 없어요!
            </h3>
            <p className="mb-6 text-muted-foreground">
              다른 검색어나 필터를 사용해보거나, 직접 원하는 상황을
              만들어보세요.
            </p>
            <Link
              to="/app/test/new-conversation"
              className="inline-flex items-center rounded-lg border border-transparent bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-sm transition duration-300 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <PlusCircle className="mr-2 h-5 w-5" strokeWidth={2.5} />
              나만의 상황 만들기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExploreScenariosPage;
