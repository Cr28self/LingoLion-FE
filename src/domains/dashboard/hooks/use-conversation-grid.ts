import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllInfiniteConversations } from "../api/get-all-conversations";
interface Conversation {
  id: number;
  title: string;
  icon: string;
  createdAt: string;
}

export function useConversationGrid() {
  const navigate = useNavigate();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetAllInfiniteConversations();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [conversationToDelete, setConversationToDelete] = useState<
    number | null
  >(null);
  const [conversationToEdit, setConversationToEdit] =
    useState<Conversation | null>(null);

  const conversations = data?.pages || [];
  const pageInfo = data?.pageParams;

  // 삭제 버튼 클릭 핸들러
  const handleDeleteClick = (conversationId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversationToDelete(conversationId);
    setIsDeleteDialogOpen(true);
  };

  // 편집 버튼 클릭 핸들러
  const handleEditClick = (conversation: Conversation, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversationToEdit(conversation);
    setIsEditModalOpen(true);
  };

  // 대화 계속하기 핸들러
  const handleContinueConversation = (
    conversationId: number,
    conversationTitle: string
  ) => {
    const encodedTitle = encodeURIComponent(
      encodeURIComponent(conversationTitle)
    );

    navigate(`/app/conv/${conversationId}/${encodedTitle}`);
  };

  return {
    conversations,
    pageInfo,
    isDeleteDialogOpen,
    isEditModalOpen,
    conversationToDelete,
    conversationToEdit,
    setIsDeleteDialogOpen,
    setIsEditModalOpen,
    fetchNextPage,
    handleDeleteClick,
    handleEditClick,
    handleContinueConversation,
    hasNextPage,
    isFetchingNextPage,
  };
}
