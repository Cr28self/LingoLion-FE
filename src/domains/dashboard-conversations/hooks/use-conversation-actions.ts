import { useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteConversation } from '@/domains/dashboard-conversations/api/delete-conversation';
import { useUpdateConversation } from '@/domains/dashboard-conversations/api/update-conversation';
import { toast } from 'sonner';
import { TConversation } from '@/domains/dashboard-conversations/types/dashboard-conversation-types.ts';

export const useConversationActions = () => {
  const queryClient = useQueryClient();

  // Delete State & Logic
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [conversationToDelete, setConversationToDelete] = useState<
    number | null
  >(null);
  const { isPending: isDeletePending, mutate: mutateDelete } =
    useDeleteConversation();

  const openDeleteDialog = useCallback((id: number) => {
    setConversationToDelete(id);
    setIsDeleteDialogOpen(true);
  }, []);

  const closeDeleteDialog = useCallback(() => {
    setIsDeleteDialogOpen(false);
    // 애니메이션 고려하여 약간의 지연 후 ID 초기화 (선택 사항)
    setTimeout(() => setConversationToDelete(null), 300);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (conversationToDelete === null) return;
    mutateDelete(conversationToDelete, {
      onSuccess: () => {
        toast.success('대화가 성공적으로 삭제되었습니다.');
        queryClient.invalidateQueries({ queryKey: ['getAllConversations'] });
        closeDeleteDialog(); // 성공 시 닫기
      },
      onError: (error) => {
        console.error('삭제 오류:', error);
        toast.error('대화 삭제 중 오류가 발생했습니다.');
        // 실패 시에도 닫거나 유지할 수 있음 (여기서는 닫지 않음)
      },
      // onSettled: () => closeDeleteDialog(), // 성공/실패 상관없이 닫으려면 여기에
    });
  }, [conversationToDelete, mutateDelete, queryClient, closeDeleteDialog]);

  // Edit State & Logic
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [conversationToEdit, setConversationToEdit] =
    useState<TConversation | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingIcon, setEditingIcon] = useState('');
  const { isPending: isUpdatePending, mutate: mutateUpdate } =
    useUpdateConversation();

  const openEditSheet = useCallback((conversation: TConversation) => {
    setConversationToEdit(conversation);
    setEditingTitle(conversation.title);
    setEditingIcon(conversation.icon || '');
    setIsEditSheetOpen(true);
  }, []);

  const closeEditSheet = useCallback(() => {
    setIsEditSheetOpen(false);
    setTimeout(() => {
      setConversationToEdit(null);
      // 필드 값 초기화는 다음 열릴 때 어차피 됨
    }, 300);
  }, []);

  const handleConfirmUpdate = useCallback(() => {
    if (conversationToEdit === null) return;
    mutateUpdate(
      {
        id: conversationToEdit.id,
        data: { title: editingTitle, icon: editingIcon },
      },
      {
        onSuccess: () => {
          toast.success('대화 정보가 업데이트되었습니다.');
          queryClient.invalidateQueries({ queryKey: ['getAllConversations'] });
          closeEditSheet(); // 성공 시 닫기
        },
        onError: (error) => {
          console.error('업데이트 오류:', error);
          toast.error('대화 업데이트 중 오류가 발생했습니다.');
        },
      }
    );
  }, [
    conversationToEdit,
    editingTitle,
    editingIcon,
    mutateUpdate,
    queryClient,
    closeEditSheet,
  ]);

  return {
    // Delete related
    isDeleteDialogOpen,
    isDeletePending,
    openDeleteDialog,
    closeDeleteDialog,
    handleConfirmDelete,
    // Edit related
    isEditSheetOpen,
    isUpdatePending,
    editingTitle,
    editingIcon,
    setEditingTitle, // Input 변경 위해 필요
    setEditingIcon, // Input 변경 위해 필요
    openEditSheet,
    closeEditSheet,
    handleConfirmUpdate,
    // 현재 편집중인 데이터 원본 (Sheet 제목 등에 활용 가능)
    currentEditingConversation: conversationToEdit,
  };
};
