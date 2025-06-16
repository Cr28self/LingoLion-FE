import React from 'react';
import { ArrowRight, Clock, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { getDaysAgo } from '@/lib/utils.ts'; // Assuming getDaysAgo is correctly typed and works
import { TSituation, TSituationMode } from '@/entities/situation/types.ts'; // Use the correct Situation type

// Define the full type expected for a situation in the card
type SituationWithMeta = TSituation & { id: number; createdAt: Date };

type SituationCardProps = {
  situation: SituationWithMeta;
  onEdit: (situation: SituationWithMeta) => void;
  onDelete: (id: number) => void;
  onCreateConversation: (situation: SituationWithMeta) => void; // ✨ Add prop for create action
  isDeleting?: boolean;
  isEditing?: boolean;
  mode: TSituationMode;
  // No onCreateConversation needed here, as the trigger wraps the card
};

// Use forwardRef for infinite scroll target
export const SituationCard = React.forwardRef<
  HTMLDivElement,
  SituationCardProps
>(
  (
    {
      situation,
      onEdit,
      onDelete,
      onCreateConversation,
      isDeleting,
      isEditing,
      mode,
    }, // ✨ Destructure new prop
    targetRef // Ref from forwardRef
  ) => {
    // Event handlers for buttons, stop propagation to prevent card click
    const handleEditClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onEdit(situation);
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onDelete(situation.id);
    };

    // ✨ Handle card click to trigger conversation-session creation
    const handleCreateConversation = () => {
      // Prevent triggering if edit/delete is pending? (Optional)

      if (isEditing || isDeleting) return;
      console.log('Creating conversation for situation:', situation);

      onCreateConversation(situation);
    };

    return (
      // Outer div for ref and hover group
      <div
        className={'group relative h-full'}
        ref={targetRef} // Attach the ref here
      >
        {/* Card Content - This will be the trigger for MakeConversationSetupModal */}
        <div
          // [스타일 대상 1] 카드 컨테이너
          className={`relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-border bg-card p-5 text-left shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-2xl dark:shadow-lg dark:shadow-primary/10 dark:hover:shadow-xl dark:hover:shadow-primary/15`}
        >
          {/* Content */}
          <div className="relative z-10 flex flex-1 flex-col">
            {/* Top section: Icon, Title, Date */}
            <div className="mb-3 flex items-start">
              <div className="flex-1">
                {/* [스타일 대상 2] 제목 - CSS 변수 기반으로 자동 적용 */}
                <h3 className="line-clamp-2 text-lg font-bold transition-colors duration-300 group-hover:text-primary">
                  {situation.goal}
                </h3>
                {/* [스타일 대상 3] 날짜 텍스트 */}
                <div className="mt-1 flex items-center text-xs text-gray-500 dark:text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />{' '}
                  {/* 아이콘 색상은 부모 텍스트 색상 상속 */}
                  {getDaysAgo(situation.createdAt)}
                </div>
              </div>
            </div>
            {/* [스타일 대상 4] 구분선 */}
            <div className="my-1 h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-100 dark:via-primary/20"></div>
            {/* Middle section: Roles, Goal */}
            <div className="flex-1">
              <div className="mb-1 transition-transform duration-300 group-hover:translate-x-1">
                {/* [스타일 대상 5] "역할:" 라벨 */}
                <span className="text-xs font-medium text-gray-600 dark:text-muted-foreground">
                  역할:
                </span>
                {/* [스타일 대상 6] 역할 내용 텍스트 */}
                <span className="ml-1 text-xs text-gray-800 dark:text-foreground/90">
                  {situation.userRole}
                </span>
              </div>
              <div className="mb-1 transition-transform duration-300 group-hover:translate-x-1">
                {/* [스타일 대상 5] "AI:" 라벨 */}
                <span className="text-xs font-medium text-gray-600 dark:text-muted-foreground">
                  AI:
                </span>
                {/* [스타일 대상 6] AI 내용 텍스트 */}
                <span className="ml-1 text-xs text-gray-800 dark:text-foreground/90">
                  {situation.aiRole}
                </span>
              </div>
              <div className="origin-left transform transition-transform duration-300 group-hover:scale-[1.02]">
                {/* [스타일 대상 7] 목표 설명 영역 */}

                <span className="text-xs font-medium text-gray-600 dark:text-muted-foreground">
                  장소:
                </span>

                <span className="ml-1 text-xs text-gray-800 dark:text-foreground/90">
                  {situation.place || '목표가 설정되지 않았습니다.'}
                </span>
              </div>
            </div>
            {/* [스타일 대상 8] "대화 시작" 버튼 - CSS 변수 기반으로 자동 적용 */}
            <Button
              className={`mt-3 inline-flex w-full transform items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-hover:bg-primary/90 group-hover:opacity-100`}
              onClick={handleCreateConversation}
              // dark:bg-primary, dark:text-primary-foreground, dark:group-hover:bg-primary/90 등은
              // CSS 변수를 통해 자동으로 적용됩니다.
            >
              대화 시작
              <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />{' '}
              {/* 아이콘 색상은 부모 텍스트 색상 상속 */}
            </Button>
          </div>
        </div>

        {mode === 'my' && (
          <div className="absolute right-3 top-3 z-20 flex translate-y-1 transform space-x-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            {/* Edit Button */}
            <Button
              variant="outline"
              size="icon"
              // [스타일 대상 9-1] 편집 버튼 배경
              className={`h-8 w-8 rounded-full bg-white p-0 shadow-sm transition-colors hover:bg-blue-50 dark:bg-secondary dark:hover:bg-blue-500/20`}
              onClick={handleEditClick}
              aria-label="편집"
              disabled={isEditing || isDeleting}
            >
              {/* [스타일 대상 9-2] 편집 버튼 아이콘 */}
              <Pencil className="h-4 w-4 text-blue-500 dark:text-blue-400" />
            </Button>

            {/* Delete Button */}
            <Button
              variant="outline"
              size="icon"
              // [스타일 대상 10-1] 삭제 버튼 배경
              className={`h-8 w-8 rounded-full bg-white p-0 shadow-sm transition-colors hover:bg-red-50 dark:bg-secondary dark:hover:bg-destructive/20`}
              onClick={handleDeleteClick}
              aria-label="삭제"
              disabled={isDeleting || isEditing}
            >
              {/* [스타일 대상 10-2] 삭제 버튼 아이콘 */}
              <Trash2 className="h-4 w-4 text-red-500 dark:text-destructive" />
            </Button>
          </div>
        )}
      </div>
    );
  }
);

SituationCard.displayName = 'SituationCard';
