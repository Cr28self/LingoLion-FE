import { Skeleton } from '@/components/ui/skeleton';
import { useGetAllInfiniteConversations } from '@/features/conversation-list/api/get-all-conversations';
import { getDaysAgo } from '@/lib/utils';
import {
  ArrowRight,
  BookOpen,
  Clock,
  FilePenLine,
  FolderKanban,
  Search,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SkeletonRecentConversations = () => {
  return (
    <div className={'mb-2 flex items-baseline space-x-3 space-y-3 px-3'}>
      <div className="shrink-0">
        <Skeleton className="h-10 w-10 rounded-full bg-[#e68a4f]" />
      </div>

      <div className="w-full space-y-2">
        <Skeleton className="h-4 w-full bg-[#e68a4f]" />
        <Skeleton className="h-4 w-3/4 bg-[#e68a4f]" />
      </div>
    </div>
  );
};

const OverviewPage = () => {
  const { data, isLoading } = useGetAllInfiniteConversations();
  const conversations = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className="mx-auto max-w-7xl p-6 md:p-10">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold md:text-4xl">안녕하세요! 👋</h1>
        <p className="text-lg text-muted-foreground md:text-xl">
          오늘도 즐겁게 영어 실력을 향상시켜 보세요!
        </p>
      </div>

      <div className="mb-12 rounded-xl bg-card p-6 shadow-lg">
        <h2 className="mb-4 flex items-center text-xl font-semibold dark:text-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6 text-orange-500 dark:text-orange-400"
          >
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
          빠른 시작
        </h2>
        <div className="mb-2 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Link
            to="/app/explore-situations"
            className="group relative block transform overflow-hidden rounded-xl bg-gradient-to-br from-primary via-orange-600 to-red-600 p-8 text-primary-foreground shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
          >
            <Search
              className="absolute right-4 top-4 h-12 w-12 text-primary-foreground/70 transition duration-300 group-hover:rotate-12 group-hover:opacity-100"
              strokeWidth={1.5}
            />
            <h2 className="mb-2 text-xl font-bold">🌍 상황 탐색 & 대화 시작</h2>
            <p className="mb-4 text-sm text-primary-foreground/80">
              다양한 추천 상황을 둘러보고 마음에 드는 주제로 바로 대화를
              시작하세요.
            </p>
            <span className="inline-flex items-center font-semibold text-primary-foreground decoration-primary-foreground/50 group-hover:underline">
              바로 가기 <ArrowRight className="ml-1 h-5 w-5" />
            </span>
          </Link>
          {/* 나만의 상황 만들기 카드 - Secondary 배경에 Primary 포인트 */}
          <Link
            to="/app/create-situation"
            className="group relative block transform overflow-hidden rounded-xl border border-l-8 border-green-500 bg-card p-8 shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:border-primary/50 hover:shadow-2xl"
          >
            <FilePenLine
              className="absolute right-4 top-4 h-12 w-12 text-primary/70 transition duration-300 group-hover:rotate-12 group-hover:text-primary"
              strokeWidth={1.5}
            />
            <h2 className="mb-2 text-xl font-bold text-foreground">
              ✍️ 나만의 상황 만들기
            </h2>
            <p className="mb-4 text-sm text-muted-foreground">
              원하는 특정 주제나 목표가 있다면 직접 상황을 설정하여 연습할 수
              있어요.
            </p>
            <span className="inline-flex items-center font-semibold text-primary decoration-primary/50 group-hover:underline">
              만들러 가기 <ArrowRight className="ml-1 h-5 w-5" />
            </span>
          </Link>
          {/* 3. 내 상황 목록 보기 카드 */}
          <Link
            to="/app/my-situations" // '/app/scenarios' 경로로 연결
            className="group relative block transform overflow-hidden rounded-xl border border-l-8 border-yellow-400 bg-card p-6 shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:border-primary/50 hover:shadow-2xl md:p-8"
          >
            <FolderKanban
              className="absolute right-4 top-4 h-10 w-10 text-primary/70 transition duration-300 group-hover:rotate-12 group-hover:text-primary md:h-12 md:w-12"
              strokeWidth={1.5}
            />
            <h2 className="mb-2 text-xl font-bold text-foreground">
              📁 내 상황 목록
            </h2>
            <p className="mb-4 text-sm text-muted-foreground">
              저장된 상황 보기
            </p>
            <span className="inline-flex items-center text-sm font-semibold text-primary decoration-primary/50 group-hover:underline">
              목록 보기 <ArrowRight className="ml-1 h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="rounded-xl bg-card p-6 shadow-lg lg:col-span-2">
          <h2 className="mb-5 flex items-center text-xl font-semibold text-foreground">
            <BookOpen className="mr-2 h-6 w-6 text-primary" strokeWidth={2} />
            최근 진행한 회화
          </h2>

          {isLoading ? (
            <>
              <SkeletonRecentConversations />
              <SkeletonRecentConversations />
              <SkeletonRecentConversations />
            </>
          ) : conversations.length > 0 ? (
            <div className="space-y-4">
              {conversations.slice(0, 3).map((conv) => (
                <Link
                  key={conv.id}
                  to={`/app/conversation-session/${conv.id}`}
                  className="block transform rounded-lg border-l-8 border-primary bg-card p-5 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-foreground">
                      {conv.title}
                    </span>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      {getDaysAgo(conv.createdAt)}
                    </div>
                  </div>
                </Link>
              ))}
              <div className="mt-5 text-right">
                {/* 링크 색상을 Primary로 */}
                <Link
                  to="/app/my-conversations"
                  className="group inline-flex items-center font-medium text-primary transition duration-200 hover:text-primary/80"
                >
                  전체 기록 보기
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-card py-10 text-center shadow-md">
              <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
              <p className="text-muted-foreground">
                아직 진행한 회화가 없습니다.
              </p>
              <p className="mt-1 text-sm text-muted-foreground/80">
                새로운 대화를 시작해보세요!
              </p>
            </div>
          )}
        </div>
        {/* 학습 통계 */}
      </div>
    </div>
  );
};

export default OverviewPage;
