import { useSituationActions } from '../hooks/use-situation-actions';
import { useGetInfiniteSituations } from '../api/get-situations'; // IMPORT data fetching hook
import useInfiniteScroll from '@/hooks/use-infinite-scroll';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Suspense, useState } from 'react';
import { SkeletonCardSitu } from '../../dashboard-common/components/contents-skeleton-loading.tsx';
import { TSituation, TSituationMode } from '@/types/situation.ts'; // Ensure TSituation is imported
import { SituationCard } from './situation-card';
import { ConfirmActionDialog } from '@/domains/dashboard-common/components/confirm-action-dialog.tsx';
import { ResourceFormSheet } from '@/domains/dashboard-common/components/resource-form-sheet.tsx';
import { CreateConversationDialog } from '@/domains/dashboard-situations/components/modal/create-conversation-dialog.tsx';

type SituationGridContentsProps = {
  // Renamed from SituationGridProps
  mode: TSituationMode;
};

// Define the full type expected for situations (if not already globally defined)
type SituationWithMeta = TSituation & { id: number; createdAt: Date };

const SituationGridContents = ({ mode }: SituationGridContentsProps) => {
  // --- Data Fetching (Moved from useSituationGrid) ---
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetInfiniteSituations(mode); // Call data fetching hook directly

  // Derive situations array from fetched data
  const situations =
    data?.pages.flatMap((page) => page.data as SituationWithMeta[]) || [];

  // --- Action Handling Hook (Now includes getIconForSituation) ---
  const {
    // ... (delete/edit states and functions)
    isDeleteDialogOpen,
    isDeletePending,
    openDeleteDialog,
    closeDeleteDialog,
    handleConfirmDelete,
    isEditSheetOpen,
    isUpdatePending,
    openEditSheet,
    closeEditSheet,
    handleConfirmUpdate,
    currentEditingSituation,
    editingAiRole,
    editingGoal,
    editingUserRole,
    setEditingAiRole,
    setEditingGoal,
    setEditingUserRole,

    editingPlace,
    setEditingPlace /* ... other edit states/setters */,

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

    getIconForSituation,
  } = useSituationActions({ mode });
  // --- Infinite Scroll Hook ---
  // Props now come directly from useGetInfiniteSituations result
  const { rootRef, targetRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <div
      className="relative h-[600px] overflow-y-auto rounded-md border"
      ref={rootRef}
    >
      {/* Grid Layout */}
      <div className="grid grid-cols-1 gap-5 p-1 md:grid-cols-2 lg:grid-cols-3">
        {situations.map((situation, situationIndex) => {
          const isLastItem = situationIndex === situations.length - 1;
          // Call getIconForSituation obtained from useSituationActions
          const icon = getIconForSituation(situation);

          return (
            // ✨ Remove the wrapper, render Card directly
            <SituationCard
              key={situation.id} // Key on the card itself
              situation={situation}
              icon={icon}
              onEdit={openEditSheet}
              onDelete={openDeleteDialog}
              onCreateConversation={openCreateDialog} // ✨ Pass the open function from hook
              ref={isLastItem ? targetRef : null}
              isDeleting={isDeletePending}
              isEditing={
                isUpdatePending && currentEditingSituation?.id === situation.id
              }
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

      {/* Generic Delete Confirmation Dialog */}
      <ConfirmActionDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={(open) => !open && closeDeleteDialog()}
        title="상황 삭제"
        description="이 상황을 정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        confirmText="삭제"
        confirmVariant="destructive"
        onConfirm={handleConfirmDelete}
        isPending={isDeletePending}
      />

      {/* Generic Edit Resource Sheet */}
      <ResourceFormSheet
        isOpen={isEditSheetOpen}
        onOpenChange={(open) => !open && closeEditSheet()}
        title={`'${currentEditingSituation?.place || ''}' 편집`}
        description="상황의 세부 정보를 수정한 후 저장 버튼을 클릭하세요."
        onSubmit={handleConfirmUpdate}
        isPending={isUpdatePending}
        submitText="저장"
      >
        {/* Form Content as Children */}
        <div className="grid gap-4 py-6">
          <div className="grid gap-2">
            <label htmlFor="edit-place" className="text-sm font-medium">
              장소
            </label>
            <Input
              id="edit-place"
              value={editingPlace}
              onChange={(e) => setEditingPlace(e.target.value)}
              className="w-full"
              disabled={isUpdatePending}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="edit-userRole" className="text-sm font-medium">
              사용자 역할
            </label>
            <Input
              id="edit-userRole"
              value={editingUserRole}
              onChange={(e) => setEditingUserRole(e.target.value)}
              className="w-full"
              disabled={isUpdatePending}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="edit-aiRole" className="text-sm font-medium">
              AI 역할
            </label>
            <Input
              id="edit-aiRole"
              value={editingAiRole}
              onChange={(e) => setEditingAiRole(e.target.value)}
              className="w-full"
              disabled={isUpdatePending}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="edit-goal" className="text-sm font-medium">
              목표
            </label>
            <Textarea
              id="edit-goal"
              value={editingGoal}
              onChange={(e) => setEditingGoal(e.target.value)}
              className="w-full"
              rows={4}
              disabled={isUpdatePending}
            />
          </div>
        </div>
      </ResourceFormSheet>

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

// Main SituationGrid component (Structure remains the same)
const SituationGrid = () => {
  const [mode, setMode] = useState<TSituationMode>('all');

  return (
    <div className="rounded-xl border border-white/50 bg-white/70 p-6 shadow-sm backdrop-blur-md">
      {/* Mode Selection UI */}
      <div className="mb-6 flex items-center justify-between">
        <div className="rounded-lg bg-gray-100/80 p-1">
          <div className="flex items-center space-x-1">
            {/* Buttons remain the same */}
            <Button
              variant={mode === 'all' ? 'default' : 'ghost'}
              onClick={() => setMode('all')}
              className={`relative px-6 py-2 transition-all duration-200 ${
                mode === 'all'
                  ? 'bg-white text-orange-600 shadow-sm hover:bg-white/90'
                  : 'text-gray-600 hover:bg-white/50'
              } `}
            >
              <span className="font-medium">전체 상황 목록</span>
              {mode === 'all' && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-200 opacity-75"></span>
                  <span className="relative inline-flex h-4 w-4 rounded-full bg-orange-400"></span>
                </span>
              )}
            </Button>
            <Button
              variant={mode === 'my' ? 'default' : 'ghost'}
              onClick={() => setMode('my')}
              className={`relative px-6 py-2 transition-all duration-200 ${
                mode === 'my'
                  ? 'bg-white text-orange-600 shadow-sm hover:bg-white/90'
                  : 'text-gray-600 hover:bg-white/50'
              } `}
            >
              <span className="font-medium">내 상황 목록</span>
              {mode === 'my' && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-200 opacity-75"></span>
                  <span className="relative inline-flex h-4 w-4 rounded-full bg-orange-400"></span>
                </span>
              )}
            </Button>
          </div>
        </div>
        {/* Other controls if needed */}
      </div>

      {/* Render Content with Suspense */}
      <Suspense fallback={<SkeletonCardSitu />}>
        {/* Pass mode down to Contents */}
        <SituationGridContents mode={mode} />
      </Suspense>
    </div>
  );
};

export default SituationGrid;
