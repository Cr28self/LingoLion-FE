import { Link } from 'react-router-dom';
import { FolderKanban, PlusCircle } from 'lucide-react';
import { SituationCard } from '@/entities/situation/components/situation-card.tsx';
import { useGetInfiniteSituations } from '@/features/situation-list/api/get-situations.ts';
import useInfiniteScroll from '@/hooks/use-infinite-scroll.ts';
import { TSituation } from '@/entities/situation/types.ts';
import { SkeletonCardSituations } from '@/features/situation-list/components/skeleton-card-situations.tsx';
import { CreateConversationDialog } from '@/features/situation-list/components/modal/create-conversation-dialog';
import { useSituationActions } from '@/features/situation-list/hooks/use-situation-actions';
import useCreateSituationRouteStore from '@/features/situation-create/store/use-create-situation-route-store';
import { useEffect, useMemo } from 'react';

type SituationWithMeta = TSituation & { id: number; createdAt: Date };

const MySituationsPage = () => {
  // --- Data Fetching (Moved from useSituationGrid) ---
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useGetInfiniteSituations('my'); // Call data fetching hook directly

  // Derive situations array from fetched data
  const situations = useMemo(() => {
    return (
      data?.pages.flatMap((page) => page.data as SituationWithMeta[]) || []
    );
  }, [data]);

  const {
    // ... (delete/edit states and functions)
    openDeleteDialog,
    openEditSheet,
    // ✨ Create Conversation states and functions from hook
    isCreateDialogOpen,
    isCreatePending,
    openCreateDialog,
    closeCreateDialog,
    handleConfirmCreateConversation,
    currentSituationToCreateFrom,
    createTitle,
    setCreateTitle,
    createIcon,
    setCreateIcon,
    createDifficulty,
    setCreateDifficulty,
    createRequest,
    setCreateRequest,
  } = useSituationActions({ mode: 'my' });

  // --- Infinite Scroll Hook ---
  // Props now come directly from useGetInfiniteSituations result
  const { rootRef, targetRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  // ✨ useEffect를 사용하여 렌더링과 부수 효과를 분리합니다.
  useEffect(() => {
    // Zustand 스토어에서 리다이렉트 여부를 가져옵니다.
    const isRedirect =
      useCreateSituationRouteStore.getState().isRedirectToCreateSituation;

    if (!isRedirect) return; // 리다이렉트가 필요하지 않으면 아무것도 하지 않습니다.

    // 1. 리다이렉트 플래그가 true이고,
    // 2. situations 데이터가 최소 1개 이상 로드되었는지 확인합니다.
    if (isRedirect && situations.length > 0) {
      // 모달을 엽니다.
      openCreateDialog(situations[0]);

      // 🔥 중요: 모달을 연 후에는 플래그를 다시 false로 바꿔서
      // 다른 이유로 컴포넌트가 재렌더링 되어도 모달이 다시 열리는 것을 방지합니다.
      useCreateSituationRouteStore.setState({
        isRedirectToCreateSituation: false,
      });
    }
  }, [situations, openCreateDialog]); // situations 데이터가 변경될 때마다 이 effect를 재실행하여 조건을 확인합니다.

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
                  onEdit={openEditSheet}
                  onDelete={openDeleteDialog}
                  onCreateConversation={openCreateDialog} // ✨ Pass the open function from hook
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

      <CreateConversationDialog
        isOpen={isCreateDialogOpen}
        onOpenChange={(open) => !open && closeCreateDialog()} // Close handler
        onSubmit={handleConfirmCreateConversation} // Submit handler
        isPending={isCreatePending} // Loading state
        situation={currentSituationToCreateFrom} // Pass the selected situation
        // Pass form state and setters
        title={createTitle}
        setTitle={setCreateTitle}
        icon={createIcon}
        setIcon={setCreateIcon}
        difficulty={createDifficulty}
        setDifficulty={setCreateDifficulty}
        request={createRequest}
        setRequest={setCreateRequest}
      />
    </div>
  );
};

export default MySituationsPage;
