// src/pages/HistoryListPage.jsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
// lucide-react 아이콘 임포트
import {
  History,
  Search,
  Filter,
  CalendarDays,
  Gauge,
  MessageSquareText,
  ChevronRight,
  FolderClock,
  PlusCircle,
} from 'lucide-react';

// 가상 데이터: 과거 대화 기록 목록 (API 응답 대체)
const mockHistoryData = [
  {
    id: 'h1',
    topic: '카페에서 커피 주문하기', // 진행했던 대화의 주제 또는 상황 제목
    date: '2023-10-27',
    time: '15:30',
    difficulty: '초급',
    // 간단 요약이나 주요 피드백 키워드 등 추가 가능
    summary: '라떼 주문 및 사이즈 변경 요청 연습.',
  },
  {
    id: 'h2',
    topic: '호텔 체크인 문의',
    date: '2023-10-26',
    time: '09:15',
    difficulty: '중급',
    summary: '예약 확인 및 오션뷰 룸 가능 여부 문의.',
  },
  {
    id: 'h3',
    topic: '친구와 주말 계획 세우기',
    date: '2023-10-25',
    time: '20:00',
    difficulty: '초급',
    summary: '영화 보기 제안 및 시간 조율.',
  },
  {
    id: 'h4',
    topic: '기술 면접 - 자기소개',
    date: '2023-10-23',
    time: '11:00',
    difficulty: '고급',
    summary: '경력 중심의 자기소개 및 강점 어필 연습.',
  },
  // ... 다른 대화 기록
];

// 난이도별 스타일 반환 함수 (기존 함수 재사용 또는 약간 수정)
const getDifficultyBadgeStyle = (difficulty) => {
  switch (difficulty) {
    case '초급':
      return 'bg-green-100 text-green-700 border border-green-200';
    case '중급':
      return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
    case '고급':
      return 'bg-red-100 text-red-700 border border-red-200';
    default:
      return 'bg-muted text-muted-foreground border-border';
  }
};

function HistoryListPage() {
  const [historyList, setHistoryList] = useState(mockHistoryData);
  const [searchTerm, setSearchTerm] = useState('');
  // TODO: 필터 상태 추가 (예: 날짜 범위, 난이도 등)

  // 검색어 기반 필터링 (추후 더 복잡한 필터 로직 추가 가능)
  const filteredList = useMemo(() => {
    if (!searchTerm) return historyList;
    return historyList.filter(
      (item) =>
        item.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.summary &&
          item.summary.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, historyList]);

  return (
    // 배경 그라데이션 적용
    <div className="min-h-screen bg-gradient-to-b from-background via-orange-50 to-red-50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        {/* 페이지 헤더 */}
        <div className="mb-8 md:flex md:items-center md:justify-between">
          <h1 className="mb-4 flex items-center text-3xl font-bold text-foreground md:mb-0 md:text-4xl">
            <History className="mr-3 h-8 w-8 text-primary" strokeWidth={2} />
            나의 대화 기록
          </h1>
          {/* 검색 및 필터 영역 (선택 사항) */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search
                  className="h-4 w-4 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                placeholder="주제/내용 검색..."
                className="block w-full rounded-md border border-input bg-card py-2 pl-9 pr-3 leading-5 text-foreground placeholder-muted-foreground transition duration-150 ease-in-out focus:border-ring focus:placeholder-muted-foreground/80 focus:outline-none focus:ring-1 focus:ring-ring sm:text-sm md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* 필터 버튼 (기능 구현 필요) */}
            <button
              className="inline-flex items-center rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted focus:outline-none focus:ring-1 focus:ring-ring"
              onClick={() => alert('필터 기능 구현 필요')}
            >
              <Filter className="mr-1.5 h-4 w-4" /> 필터
            </button>
          </div>
        </div>

        {/* 대화 기록 목록 또는 빈 상태 메시지 */}
        {filteredList.length > 0 ? (
          <div className="space-y-4">
            {filteredList.map((item) => (
              // 각 기록 항목을 Link로 감싸 상세 페이지로 이동
              <Link
                key={item.id}
                to={`/app/history/${item.id}`}
                // 리스트 아이템 디자인: 배경, 그림자, 테두리, 호버 효과
                className="block overflow-hidden rounded-lg border border-border bg-card shadow-md transition duration-300 ease-in-out hover:border-primary/30 hover:shadow-lg"
              >
                <div className="flex items-center justify-between space-x-4 p-5">
                  {/* 좌측 정보 영역 */}
                  <div className="min-w-0 flex-grow">
                    {' '}
                    {/* 내용 잘림 방지 */}
                    {/* 주제 */}
                    <h3 className="mb-1 truncate text-lg font-semibold text-foreground transition duration-200 group-hover:text-primary">
                      {item.topic || '제목 없는 대화'}
                    </h3>
                    {/* 날짜 및 시간 */}
                    <div className="mb-1 flex items-center text-sm text-muted-foreground">
                      <CalendarDays className="mr-1.5 h-4 w-4 flex-shrink-0" />
                      <span>
                        {item.date || '-'} {item.time ? `(${item.time})` : ''}
                      </span>
                    </div>
                    {/* 간단 요약 (있을 경우) */}
                    {item.summary && (
                      <p className="truncate text-sm text-muted-foreground">
                        {item.summary}
                      </p>
                    )}
                  </div>

                  {/* 우측 정보 및 이동 아이콘 영역 */}
                  <div className="flex flex-shrink-0 items-center space-x-4">
                    {/* 난이도 뱃지 */}
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getDifficultyBadgeStyle(item.difficulty)}`}
                    >
                      <Gauge className="mr-1 h-3 w-3" />{' '}
                      {item.difficulty || '미설정'}
                    </span>
                    {/* 상세 보기 아이콘 */}
                    <ChevronRight className="h-6 w-6 text-muted-foreground transition-colors duration-200 group-hover:text-primary" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // 빈 상태 UI
          <div className="mt-10 rounded-lg border border-border bg-card px-6 py-16 text-center shadow-md">
            {/* 검색 결과가 없을 때와 아예 기록이 없을 때 구분 가능 */}
            {searchTerm ? (
              <>
                <Search
                  className="mx-auto mb-5 h-16 w-16 text-muted-foreground/50"
                  strokeWidth={1}
                />
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  검색 결과가 없습니다
                </h3>
                <p className="text-muted-foreground">
                  다른 검색어를 입력해보세요.
                </p>
              </>
            ) : (
              <>
                <FolderClock
                  className="mx-auto mb-5 h-16 w-16 text-muted-foreground/50"
                  strokeWidth={1}
                />
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  아직 대화 기록이 없어요!
                </h3>
                <p className="mb-6 text-muted-foreground">
                  AI와 첫 대화를 시작하고 기록을 남겨보세요.
                </p>
                {/* 대시보드나 새 대화 시작 페이지로 이동하는 버튼 */}
                <Link
                  to="/app/explore" // 또는 /app/new-conversation
                  className="inline-flex items-center rounded-lg border border-transparent bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-sm transition duration-300 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <PlusCircle className="mr-2 h-5 w-5" strokeWidth={2.5} />새
                  대화 시작하기
                </Link>
              </>
            )}
          </div>
        )}
        {/* 페이지네이션 (필요시 추가) */}
        {/* <div className="mt-8 flex justify-center"> ... </div> */}
      </div>
    </div>
  );
}

export default HistoryListPage;
