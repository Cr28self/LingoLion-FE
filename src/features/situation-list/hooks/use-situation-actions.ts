import { useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { TSituation, TSituationMode } from '@/entities/situation/types.ts';
import { useNavigate } from 'react-router-dom';
import { useDeleteSituation } from '@/features/situation-list/api/delete-situations.ts';
import { useUpdateSituation } from '@/features/situation-list/api/update-situation.ts';
import { useMakeConversation } from '@/features/situation-list/api/make-conversation.ts'; // Import useNavigate

// Situation 객체의 전체 타입
type SituationWithMeta = TSituation & { id: number; createdAt: Date };

type UseSituationActionsProps = {
  mode: TSituationMode;
};

export const useSituationActions = ({ mode }: UseSituationActionsProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate(); // Hook for navigation
  const queryKeySituations = ['getSituationsInfinite', mode];
  const queryKeyConversations = ['getAllConversations']; // For invalidation

  // --- Delete State & Logic ---
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [situationToDelete, setSituationToDelete] = useState<number | null>(
    null
  );
  const { isPending: isDeletePending, mutate: mutateDelete } =
    useDeleteSituation();

  const openDeleteDialog = useCallback((id: number) => {
    setSituationToDelete(id);
    setIsDeleteDialogOpen(true);
  }, []);

  const closeDeleteDialog = useCallback(() => {
    setIsDeleteDialogOpen(false);
    setTimeout(() => setSituationToDelete(null), 300);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (situationToDelete === null) return;
    mutateDelete(situationToDelete, {
      onSuccess: () => {
        toast.success('상황이 성공적으로 삭제되었습니다.');
        queryClient.invalidateQueries({ queryKey: queryKeySituations });
        closeDeleteDialog();
      },
      onError: (error) => {
        console.error('Situation delete error:', error);
        toast.error('상황 삭제 중 오류가 발생했습니다.');
      },
    });
  }, [
    situationToDelete,
    mutateDelete,
    queryClient,
    closeDeleteDialog,
    queryKeySituations,
  ]);

  // --- Edit State & Logic ---
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [situationToEdit, setSituationToEdit] =
    useState<SituationWithMeta | null>(null);
  const [editingPlace, setEditingPlace] = useState('');
  const [editingUserRole, setEditingUserRole] = useState('');
  const [editingAiRole, setEditingAiRole] = useState('');
  const [editingGoal, setEditingGoal] = useState('');
  const { isPending: isUpdatePending, mutate: mutateUpdate } =
    useUpdateSituation();

  const openEditSheet = useCallback((situation: SituationWithMeta) => {
    setSituationToEdit(situation);
    setEditingPlace(situation.place);
    setEditingUserRole(situation.userRole);
    setEditingAiRole(situation.aiRole);
    setEditingGoal(situation.goal || '');
    setIsEditSheetOpen(true);
  }, []);

  const closeEditSheet = useCallback(() => {
    setIsEditSheetOpen(false);
    setTimeout(() => setSituationToEdit(null), 300);
  }, []);

  const handleConfirmUpdate = useCallback(() => {
    if (situationToEdit === null) return;
    const updatedData: Partial<TSituation> = {
      /* ... data ... */
    };
    mutateUpdate(
      { id: situationToEdit.id, data: updatedData },
      {
        onSuccess: () => {
          /* ... */ queryClient.invalidateQueries({
            queryKey: queryKeySituations,
          });
          closeEditSheet();
        },
        onError: () => {
          /* ... */
        },
      }
    );
  }, [/* ... dependencies ... */ queryKeySituations]);

  // --- Create Conversation State & Logic ---
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [situationToCreateFrom, setSituationToCreateFrom] =
    useState<SituationWithMeta | null>(null);
  const [createTitle, setCreateTitle] = useState('');
  const [createIcon, setCreateIcon] = useState('');
  const [createDifficulty, setCreateDifficulty] = useState<'상' | '중' | '하'>(
    '중'
  );
  const [createRequest, setCreateRequest] = useState('');
  const { isPending: isCreatePending, mutate: mutateCreate } =
    useMakeConversation();

  // Helper to get default icon (could be moved to utils if used elsewhere)
  const getDefaultIconForSituation = useCallback(
    (situation: SituationWithMeta | null): string => {
      if (!situation?.place) return '🗣️';
      const place = situation.place.toLowerCase();
      if (place.includes('헬스장') || place.includes('운동')) return '💪';
      if (place.includes('카페') || place.includes('커피')) return '☕';
      if (place.includes('식당') || place.includes('레스토랑')) return '🍽️';
      if (place.includes('학교') || place.includes('교실')) return '🏫';
      if (place.includes('병원') || place.includes('의사')) return '🏥';
      if (place.includes('공항') || place.includes('비행기')) return '✈️';
      if (place.includes('호텔') || place.includes('숙소')) return '🏨';
      if (place.includes('쇼핑') || place.includes('마트')) return '🛒';
      if (place.includes('면접') || place.includes('사무실')) return '💼';
      if (place.includes('스포츠') || place.includes('경기')) return '🏆';
      return '🗣️';
    },
    []
  );

  const openCreateDialog = useCallback(
    (situation: SituationWithMeta) => {
      setSituationToCreateFrom(situation);
      // Reset form fields when opening
      setCreateTitle(''); // Or maybe prefill based on situation? e.g., `대화: ${situation.place}`
      setCreateIcon(getDefaultIconForSituation(situation)); // Set default icon
      setCreateDifficulty('중');
      setCreateRequest('');
      setIsCreateDialogOpen(true);
    },
    [getDefaultIconForSituation]
  ); // Add dependency

  const closeCreateDialog = useCallback(() => {
    setIsCreateDialogOpen(false);
    // No need to reset situationToCreateFrom immediately if dialog closes slowly
    setTimeout(() => setSituationToCreateFrom(null), 300);
  }, []);

  const handleConfirmCreateConversation = useCallback(() => {
    if (!situationToCreateFrom) return;
    if (!createTitle.trim()) {
      toast.error('대화방 제목을 입력해주세요.');
      return;
    }

    mutateCreate(
      {
        situationId: situationToCreateFrom.id,
        title: createTitle.trim(), // Use trimmed title
        icon: createIcon || getDefaultIconForSituation(situationToCreateFrom), // Use state icon or default if empty
        metaData: {
          difficulty: createDifficulty,
          request: createRequest,
        },
      },
      {
        onSuccess: () => {
          toast.success('대화방 생성 완료!');
          queryClient.invalidateQueries({ queryKey: queryKeyConversations }); // Invalidate conversation-session list
          closeCreateDialog();
          navigate('/app/dashboard/conversations'); // Navigate to conversations page
        },
        onError: (error) => {
          console.error('Conversation creation error:', error);
          toast.error('대화방 만들기에 실패했습니다.');
          // Optionally keep the dialog open on error
        },
      }
    );
  }, [
    situationToCreateFrom,
    createTitle,
    createIcon,
    createDifficulty,
    createRequest,
    mutateCreate,
    queryClient,
    closeCreateDialog,
    navigate,
    queryKeyConversations,
    getDefaultIconForSituation, // Add dependency
  ]);

  // --- Icon Utility Function (Keep if needed for Edit/Display) ---
  const getIconForSituation = useCallback(
    (situation: SituationWithMeta): string => {
      // Logic remains the same...
      return getDefaultIconForSituation(situation); // Reuse the helper
    },
    [getDefaultIconForSituation]
  );

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
    openEditSheet,
    closeEditSheet,
    handleConfirmUpdate,
    currentEditingSituation: situationToEdit,
    editingPlace,
    setEditingPlace,
    editingUserRole,
    setEditingUserRole,
    editingAiRole,
    setEditingAiRole,
    editingGoal,
    setEditingGoal,
    // Create Conversation related
    isCreateDialogOpen,
    isCreatePending,
    openCreateDialog,
    closeCreateDialog,
    handleConfirmCreateConversation,
    currentSituationToCreateFrom: situationToCreateFrom, // Pass the situation object
    createTitle,
    setCreateTitle,
    createIcon,
    setCreateIcon,
    createDifficulty,
    setCreateDifficulty,
    createRequest,
    setCreateRequest,
    // Utility
    getIconForSituation,
  };
};
