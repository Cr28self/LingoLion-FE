import { History, PlusCircle } from 'lucide-react';
import { useGetAllInfiniteConversations } from '@/features/conversation-list/api/get-all-conversations.ts';
import useInfiniteScroll from '@/hooks/use-infinite-scroll.ts';
import { ConversationCard } from '@/entities/conversation/components/conversation-card.tsx';
import { SkeletonCardConversations } from '@/features/conversation-list/components/skeleton-card-conversations.tsx';
import { Link, useNavigate } from 'react-router-dom';

const MyConversationsPage = () => {
  const navigate = useNavigate();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useGetAllInfiniteConversations();
  const conversations = data?.pages.flatMap((page) => page.data) || [];

  // --- 무한 스크롤 ---
  const { rootRef, targetRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <div className="mx-auto max-w-7xl p-6 md:p-10">
      <div className="mb-8 md:flex md:items-center md:justify-between">
        <div>
          <h1 className="mb-2 flex items-center text-3xl font-bold md:text-4xl">
            <History className={'mr-3 h-8 w-8 text-primary'} /> 나의 대화 기록
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            모든 대화 기록을 확인하고 관리하세요
          </p>
        </div>

        <Link
          to="/app/explore-situations"
          className="mt-4 inline-flex items-center justify-center rounded-lg border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm transition duration-300 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:text-gray-50 md:mt-0"
        >
          <PlusCircle className="mr-2 h-5 w-5" strokeWidth={2.5} />
          대화 생성
        </Link>
      </div>

      {/* 검색 및 필터 - 카드 스타일 적용 */}

      {isLoading ? (
        <SkeletonCardConversations />
      ) : (
        <div
          className="relative h-[600px] overflow-y-auto rounded-md" // 높이는 고정값보다 유연하게 설정하는 것이 좋을 수 있음
          ref={rootRef}
        >
          {/* 카드 그리드 */}
          <div className="grid grid-cols-1 gap-5 p-1 md:grid-cols-2">
            {/* 그리드 패딩 추가 고려 */}
            {conversations.map((conversation, conversationIndex) => {
              const isLastItem = conversationIndex === conversations.length - 1;
              return (
                <ConversationCard
                  key={conversation.id}
                  conversation={conversation}
                  onContinue={(conversationId) => {
                    navigate(`/app/conversation-session/${conversationId}`);
                  }}
                  onEdit={() => {}}
                  onDelete={() => {}}
                  ref={isLastItem ? targetRef : null} // ref는 카드 자체보다 감싸는 div에 적용하는 것이 더 안정적일 수 있음
                  isDeleting={false} // 어떤 항목이 삭제 중인지 구체화 가능 (선택적)
                  isEditing={false} // 현재 편집 중인 항목 강조 (선택적)
                />
              );
            })}
            {/* 로딩 스피너 (무한 스크롤) */}
            {isFetchingNextPage && (
              <div className="col-span-1 flex items-center justify-center p-4 md:col-span-2">
                {/* 여기에 로딩 스피너 컴포넌트 추가 */}
                <span>Loading more...</span>
              </div>
            )}
            {/* 데이터 없음 표시 */}
            {!isFetchingNextPage && conversations.length === 0 && (
              <div className="col-span-1 flex items-center justify-center p-10 text-gray-500 md:col-span-2">
                대화 목록이 없습니다.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyConversationsPage;
