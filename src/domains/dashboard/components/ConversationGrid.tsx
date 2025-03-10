import React, { useState } from "react";
import { useGetAllConversations } from "../api/get-all-conversations";
import { formatDate } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Pencil, Trash2, ArrowRight, Clock } from "lucide-react";
import DeleteConversationDialog from "./modal/DeleteConversationDialog";
import EditConversationModal from "./modal/EditConversationModal";
import { useNavigate } from "react-router-dom";
import { useConversationGrid } from "../hooks/use-conversation-grid";

const ConversationGrid = () => {
  const {
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
  } = useConversationGrid();

  return (
    <>
      {/* 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className="relative group bg-white/90 p-5 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-orange-100 flex flex-col cursor-pointer overflow-hidden"
            onClick={() => handleContinueConversation(conversation.id)}
          >
            {/* 배경 효과 - 호버 시 나타남 */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-orange-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* 콘텐츠 */}
            <div className="relative z-10 flex-1 flex flex-col">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="text-3xl mr-4 bg-gradient-to-br from-orange-100 to-orange-200 p-3 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {conversation.icon || "💬"}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-gray-800 group-hover:text-orange-700 transition-colors duration-300">
                      {conversation.title}
                    </h3>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDate(conversation.createdAt)}
                    </div>
                  </div>
                </div>

                {/* 액션 버튼 그룹 - 호버 시 표시 */}
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                  {/* 편집 버튼 */}
                  <button
                    className="p-2 bg-white rounded-full shadow-sm hover:bg-blue-50 transition-colors"
                    onClick={(e) => handleEditClick(conversation, e)}
                    aria-label="편집"
                  >
                    <Pencil className="h-4 w-4 text-blue-500" />
                  </button>

                  {/* 삭제 버튼 */}
                  <button
                    className="p-2 bg-white rounded-full shadow-sm hover:bg-red-50 transition-colors"
                    onClick={(e) => handleDeleteClick(conversation.id, e)}
                    aria-label="삭제"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>

              {/* 구분선 */}
              <div className="h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent my-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* 하단 영역 */}
              <div className="mt-auto flex justify-end items-center">
                <button
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-md text-sm hover:from-orange-600 hover:to-orange-700 transition-colors shadow-sm flex items-center gap-2 group-hover:shadow-md transform group-hover:translate-x-0 translate-x-2 opacity-90 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleContinueConversation(conversation.id);
                  }}
                >
                  계속하기
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="mt-6 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePreviousPage();
                }}
                className={!cursor ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive={!cursor}>
                1
              </PaginationLink>
            </PaginationItem>
            {cursor && (
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNextPage();
                }}
                className={
                  !pageInfo?.hasNextPage ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* 삭제 확인 다이얼로그 컴포넌트 */}
      <DeleteConversationDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        conversationId={conversationToDelete}
      />

      {/* 편집 모달 컴포넌트 */}
      <EditConversationModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        conversation={conversationToEdit}
      />
    </>
  );
};

export default ConversationGrid;
