import { useNavigate } from 'react-router-dom';
import useInfiniteScroll from '@/hooks/use-infinite-scroll'; // 실제 경로
import { useGetAllInfiniteConversations } from '@/features/dashboard-conversations/api/get-all-conversations'; // 실제 경로
import DeleteConversationDialog from './modal/delete-conversation-dialog'; // 실제 경로
import { EditConversationSheet } from '@/features/dashboard-conversations/components/modal/edit-conversation-sheet'; // 실제 경로
import { Input } from '@/components/ui/input';
import { useConversationActions } from '@/features/dashboard-conversations/hooks/use-conversation-actions.ts';
import { useCallback } from 'react';
import { TConversation } from '@/entities/conversation/types.ts';
import { ConversationCard } from '@/features/dashboard-conversations/components/conversation-card.tsx'; // 실제 경로

const ConversationGrid = () => {
  const navigate = useNavigate();

  // --- 데이터 페칭 ---
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetAllInfiniteConversations();
  const conversations = data?.pages.flatMap((page) => page.data) || [];

  // --- 무한 스크롤 ---
  const { rootRef, targetRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  // --- 대화 액션 관련 로직 (훅 사용) ---
  const {
    isDeleteDialogOpen,
    isDeletePending,
    openDeleteDialog,
    closeDeleteDialog,
    handleConfirmDelete,
    isEditSheetOpen,
    isUpdatePending,
    editingTitle,
    editingIcon,
    setEditingTitle,
    setEditingIcon,
    openEditSheet,
    closeEditSheet,
    handleConfirmUpdate,
    currentEditingConversation,
  } = useConversationActions();

  // --- 네비게이션 핸들러 ---
  const handleContinueConversation = useCallback(
    // useCallback 추가
    (conversationId: number, conversationTitle: string) => {
      const encodedTitle = encodeURIComponent(
        encodeURIComponent(conversationTitle)
      );
      navigate(`/app/conv/${conversationId}/${encodedTitle}`);
    },
    [navigate]
  );

  // --- 카드 액션 핸들러 (훅의 함수 호출) ---
  const handleEdit = useCallback(
    (conversation: TConversation) => {
      openEditSheet(conversation);
    },
    [openEditSheet]
  );

  const handleDelete = useCallback(
    (id: number) => {
      openDeleteDialog(id);
    },
    [openDeleteDialog]
  );

  return (
    <div
      className="relative h-[600px] overflow-y-auto rounded-md border" // 높이는 고정값보다 유연하게 설정하는 것이 좋을 수 있음
      ref={rootRef}
    >
      {/* 카드 그리드 */}
      <div className="grid grid-cols-1 gap-5 p-1 md:grid-cols-2">
        {' '}
        {/* 그리드 패딩 추가 고려 */}
        {conversations.map((conversation, conversationIndex) => {
          const isLastItem = conversationIndex === conversations.length - 1;
          return (
            <ConversationCard
              key={conversation.id}
              conversation={conversation}
              onContinue={handleContinueConversation}
              onEdit={handleEdit}
              onDelete={handleDelete}
              ref={isLastItem ? targetRef : null} // ref는 카드 자체보다 감싸는 div에 적용하는 것이 더 안정적일 수 있음
              isDeleting={isDeletePending} // 어떤 항목이 삭제 중인지 구체화 가능 (선택적)
              isEditing={
                isUpdatePending &&
                currentEditingConversation?.id === conversation.id
              } // 현재 편집 중인 항목 강조 (선택적)
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

      {/* 삭제 확인 다이얼로그 */}
      <DeleteConversationDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={(open) => !open && closeDeleteDialog()} // 닫힐 때만 closeDeleteDialog 호출
        title="대화 삭제"
        description="이 대화를 정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        cancelText="취소"
        confirmText="삭제"
        isPending={isDeletePending}
        onDeleteConfirm={handleConfirmDelete} // 이름 통일 (onConfirm)
      />

      {/* 편집 시트 */}
      <EditConversationSheet
        isOpen={isEditSheetOpen}
        onOpenChange={(open) => !open && closeEditSheet()} // 닫힐 때만 closeEditSheet 호출
        title={`'${currentEditingConversation?.title || ''}' 편집`} // 동적 제목
        description="대화의 제목과 아이콘을 수정한 후 저장 버튼을 클릭하세요."
        onUpdateConfirm={handleConfirmUpdate} // 이름 통일 (onSubmit)
        isPending={isUpdatePending}
      >
        {/* Sheet 내용은 children으로 전달 (이전 가이드대로) */}
        <div className="grid gap-4 py-6">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="edit-title" className="text-right font-medium">
              제목
            </label>
            <Input
              id="edit-title"
              value={editingTitle}
              onChange={(e) => setEditingTitle(e.target.value)}
              className="col-span-3"
              disabled={isUpdatePending}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="edit-icon" className="text-right font-medium">
              아이콘
            </label>
            <Input
              id="edit-icon"
              value={editingIcon}
              onChange={(e) => setEditingIcon(e.target.value)}
              className="col-span-3"
              placeholder="이모지 입력 (예: 💬)"
              disabled={isUpdatePending}
            />
          </div>
        </div>
      </EditConversationSheet>
    </div>
  );
};

export default ConversationGrid;
