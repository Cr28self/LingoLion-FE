import React from 'react';
import { ArrowRight, Clock, Pencil, Trash2 } from 'lucide-react';
import { formatDate } from '@/lib/utils.ts';
import { Button } from '@/components/ui/button.tsx';
import { TConversation } from '@/domains/dashboard-conversations/types/dashboard-conversation-types.ts';

type ConversationCardProps = {
  conversation: TConversation;
  onContinue: (id: number, title: string) => void;
  onEdit: (conversation: TConversation) => void;
  onDelete: (id: number) => void;
  isDeleting?: boolean; // Optional: 삭제 진행 중 상태 표시용
  isEditing?: boolean; // Optional: 편집 진행 중 상태 표시용
};

// 🔹 ref를 받을 수 있도록 `forwardRef`로 감싸기
export const ConversationCard = React.forwardRef<
  HTMLDivElement,
  ConversationCardProps
>(
  (
    { conversation, isDeleting, isEditing, onContinue, onDelete, onEdit },
    targetRef
  ) => {
    const handleCardClick = () => {
      onContinue(conversation.id, conversation.title);
    };

    const handleEditClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onEdit(conversation);
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onDelete(conversation.id);
    };

    const handleContinueButtonClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onContinue(conversation.id, conversation.title);
    };
    return (
      <div
        className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-orange-100 bg-white/90 p-5 shadow-sm transition-all duration-300 hover:shadow-lg"
        onClick={handleCardClick}
        ref={targetRef}
      >
        {/* 배경 효과 - 호버 시 나타남 */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-orange-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

        {/* 콘텐츠 */}
        <div className="relative z-10 flex flex-1 flex-col">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className="mr-4 rounded-lg bg-gradient-to-br from-orange-100 to-orange-200 p-3 text-3xl shadow-sm transition-transform duration-300 group-hover:scale-110">
                {conversation.icon || '💬'}
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 transition-colors duration-300 group-hover:text-orange-700">
                  {conversation.title}
                </h3>
                <div className="mt-1 flex items-center text-xs text-gray-500">
                  <Clock className="mr-1 h-3 w-3" />
                  {formatDate(conversation.createdAt)}
                </div>
              </div>
            </div>

            {/* 액션 버튼 그룹 - 호버 시 표시 */}
            <div className="flex translate-y-1 transform space-x-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {/* 편집 버튼 */}
              <Button
                className="rounded-full bg-white p-2 shadow-sm transition-colors hover:bg-blue-50"
                onClick={handleEditClick}
                aria-label="편집"
                disabled={isEditing || isDeleting} // 다른 작업 중 비활성화
              >
                <Pencil className="h-4 w-4 text-blue-500" />
              </Button>

              <Button
                className="rounded-full bg-white p-2 shadow-sm transition-colors hover:bg-red-50"
                aria-label="삭제"
                onClick={handleDeleteClick}
                disabled={isDeleting || isEditing} // 다른 작업 중 비활성화
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>

          {/* 구분선 */}
          <div className="my-4 h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-100"></div>

          {/* 하단 영역 */}
          <div className="mt-auto flex items-center justify-end">
            <button
              className="flex translate-x-2 transform items-center gap-2 rounded-md bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 text-sm text-white opacity-90 shadow-sm transition-colors hover:from-orange-600 hover:to-orange-700 group-hover:translate-x-0 group-hover:opacity-100 group-hover:shadow-md"
              onClick={handleContinueButtonClick}
            >
              계속하기
              <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    );
  }
);
