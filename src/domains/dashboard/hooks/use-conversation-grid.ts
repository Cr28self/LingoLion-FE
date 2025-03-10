import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllConversations } from "../api/get-all-conversations";
interface Conversation {
  id: number;
  title: string;
  icon: string;
  createdAt: string;
}

export function useConversationGrid() {
  const navigate = useNavigate();
  const [cursor, setCursor] = useState<string | null>(null);
  const { data } = useGetAllConversations({ cursor });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [conversationToDelete, setConversationToDelete] = useState<
    number | null
  >(null);
  const [conversationToEdit, setConversationToEdit] =
    useState<Conversation | null>(null);

  const conversations = data?.data || [];
  const pageInfo = data?.pageInfo;

  const handleNextPage = () => {
    if (pageInfo?.hasNextPage) {
      setCursor(pageInfo.endCursor);
    }
  };

  const handlePreviousPage = () => {
    setCursor(null); // 첫 페이지로 돌아가기
  };

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
  const handleContinueConversation = (conversationId: number) => {
    navigate(`/app/conv/${conversationId}`);
  };

  return {
    conversations,
    pageInfo,
    cursor,
    isDeleteDialogOpen,
    isEditModalOpen,
    conversationToDelete,
    conversationToEdit,
    setIsDeleteDialogOpen,
    setIsEditModalOpen,
    handleNextPage,
    handlePreviousPage,
    handleDeleteClick,
    handleEditClick,
    handleContinueConversation,
  };
}
