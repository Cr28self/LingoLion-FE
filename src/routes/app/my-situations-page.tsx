import { Link } from 'react-router-dom';
import { FolderKanban, PlusCircle } from 'lucide-react';
import { SituationCard } from '@/entities/situation/components/situation-card.tsx';
import { useGetInfiniteSituations } from '@/features/situation-list/api/get-situations.ts';
import useInfiniteScroll from '@/hooks/use-infinite-scroll.ts';
import { TSituation } from '@/entities/situation/types.ts';
import { SkeletonCardSituations } from '@/features/situation-list/components/skeleton-card-situations.tsx';

type SituationWithMeta = TSituation & { id: number; createdAt: Date };

const MySituationsPage = () => {
  // --- Data Fetching (Moved from useSituationGrid) ---
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useGetInfiniteSituations('my'); // Call data fetching hook directly

  // Derive situations array from fetched data
  const situations =
    data?.pages.flatMap((page) => page.data as SituationWithMeta[]) || [];

  // --- Infinite Scroll Hook ---
  // Props now come directly from useGetInfiniteSituations result
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
            <FolderKanban className={'mr-3 h-8 w-8 text-primary'} /> 나의 저장된
            상황 목록
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            다양한 상황 속에서 영어 회화를 연습해보세요!
          </p>
        </div>

        <Link
          to="/app/create-situation"
          className="mt-4 inline-flex items-center justify-center rounded-lg border border-transparent bg-primary px-6 py-3 text-base font-medium text-primary-foreground shadow-sm transition duration-300 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 md:mt-0"
        >
          <PlusCircle className="mr-2 h-5 w-5" strokeWidth={2.5} />
          나만의 상황 만들기
        </Link>
      </div>

      {/* 검색 및 필터 - 카드 스타일 적용 */}

      {isLoading ? (
        <SkeletonCardSituations />
      ) : (
        <div
          className="relative h-[600px] overflow-y-auto rounded-md"
          ref={rootRef}
        >
          {/* Grid Layout */}
          <div className="grid grid-cols-1 gap-5 p-3 md:grid-cols-2 lg:grid-cols-3">
            {situations.map((situation, situationIndex) => {
              const isLastItem = situationIndex === situations.length - 1;
              // Call getIconForSituation obtained from useSituationActions

              return (
                // ✨ Remove the wrapper, render Card directly
                <SituationCard
                  key={situation.id} // Key on the card itself
                  situation={situation}
                  onEdit={() => {}}
                  onDelete={() => {}}
                  onCreateConversation={() => {}} // ✨ Pass the open function from hook
                  ref={isLastItem ? targetRef : null}
                  isDeleting={false}
                  isEditing={false}
                  mode={'my'}
                />
              );
            })}

            {/* Loading Indicator */}
            {isFetchingNextPage && (
              <div className="col-span-1 flex items-center justify-center p-4 md:col-span-2 lg:col-span-3">
                <span>Loading more...</span>
              </div>
            )}

            {/* No Data Indicator */}
            {!isFetchingNextPage && situations.length === 0 && (
              <div className="col-span-1 flex items-center justify-center p-10 text-gray-500 md:col-span-2 lg:col-span-3">
                상황 목록이 없습니다.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MySituationsPage;
