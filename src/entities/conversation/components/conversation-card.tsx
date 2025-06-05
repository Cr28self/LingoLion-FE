// conversation-card.tsx
import React from 'react';
import { ArrowRight, Clock, Pencil, Trash2 } from 'lucide-react';
import { formatDate } from '@/lib/utils.ts';
import { Button } from '@/components/ui/button.tsx';
import { TConversation } from '@/entities/conversation/types.ts';

interface ConversationCardProps {
  conversation: TConversation;
  onContinue: (id: number, title: string) => void;
  onEdit: (conversation: TConversation) => void;
  onDelete: (id: number) => void;
  isDeleting: boolean;
  isEditing: boolean;
}

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
        className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-orange-100 bg-white/90 p-5 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-border dark:bg-card/90 dark:shadow-md dark:shadow-primary/10 dark:hover:shadow-lg dark:hover:shadow-primary/20`} // [스타일 대상 1]
        onClick={handleCardClick}
        ref={targetRef}
      >
        {/* 배경 효과 - 호버 시 나타남 */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-orange-50 to-orange-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-primary/10 dark:to-primary/20`} // [스타일 대상 2]
        ></div>
        {/* 콘텐츠 */}
        <div className="relative z-10 flex flex-1 flex-col">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div
                className={`mr-4 rounded-lg bg-gradient-to-br from-orange-100 to-orange-200 p-3 text-3xl shadow-sm transition-transform duration-300 group-hover:scale-110 dark:bg-gradient-to-br dark:from-primary/20 dark:to-primary/30`} // [스타일 대상 3]
              >
                {conversation.icon || '💬'}
              </div>
              <div>
                <h3
                  className={`text-lg font-medium text-gray-800 transition-colors duration-300 group-hover:text-orange-700 dark:text-card-foreground dark:group-hover:text-primary`} // [스타일 대상 4]
                >
                  {conversation.title}
                </h3>
                <div
                  className={`mt-1 flex items-center text-xs text-gray-500 dark:text-muted-foreground`} // [스타일 대상 5]
                >
                  <Clock className="mr-1 h-3 w-3" />{' '}
                  {/* 아이콘은 부모 텍스트 색상 상속 */}
                  {formatDate(conversation.createdAt)}
                </div>
              </div>
            </div>

            {/* 액션 버튼 그룹 - 호버 시 표시 */}
            <div className="flex translate-y-1 transform space-x-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <Button
                className={`rounded-full bg-white p-2 shadow-sm transition-colors hover:bg-blue-50 dark:bg-secondary dark:hover:bg-primary/20`} // [스타일 대상 6-1]
                onClick={handleEditClick}
                aria-label="편집"
                disabled={isEditing || isDeleting}
                variant="ghost" // variant를 추가하여 Button 기본 스타일 중 일부를 초기화하거나 조정할 수 있습니다.
                size="icon" // Button 컴포넌트가 size="icon"을 지원한다면 더 적절합니다.
              >
                <Pencil
                  className={`h-4 w-4 text-blue-500 dark:text-primary`} // [스타일 대상 6-2]
                  // (참고: dark:text-primary는 다크모드 primary 색상(오렌지/레드 계열)을 따릅니다.
                  // 파란색 계열을 유지하려면 dark:text-blue-400 또는 새 CSS 변수 필요)
                />
              </Button>

              <Button
                className={`rounded-full bg-white p-2 shadow-sm transition-colors hover:bg-red-50 dark:bg-secondary dark:hover:bg-destructive/20`} // [스타일 대상 7-1]
                aria-label="삭제"
                onClick={handleDeleteClick}
                disabled={isDeleting || isEditing}
                variant="ghost"
                size="icon"
              >
                <Trash2
                  className={`h-4 w-4 text-red-500 dark:text-destructive`} // [스타일 대상 7-2]
                />
              </Button>
            </div>
          </div>

          {/* 구분선 */}
          <div
            className={`my-4 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-100 dark:via-primary`} // [스타일 대상 8]
          ></div>

          {/* 하단 영역 */}
          <div className="mt-auto flex items-center justify-end">
            <Button
              className={`flex translate-x-2 transform items-center gap-2 rounded-md bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 text-sm text-white opacity-90 shadow-sm transition-colors hover:from-orange-600 hover:to-orange-700 group-hover:translate-x-0 group-hover:opacity-100 group-hover:shadow-md dark:bg-gradient-to-r dark:from-primary dark:to-primary/80 dark:text-primary-foreground dark:hover:from-primary/90 dark:hover:to-primary/70`} // [스타일 대상 9]
              onClick={handleContinueButtonClick}
            >
              계속하기
              <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />{' '}
              {/* 아이콘은 부모 텍스트 색상 상속 */}
            </Button>
          </div>
        </div>
      </div>
    );
  }
);
