import React from 'react';
import { ArrowRight, Clock, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import { getDaysAgo } from '@/lib/utils.ts'; // Assuming getDaysAgo is correctly typed and works
import { TSituation } from '@/types/situation.ts'; // Use the correct Situation type

// Define the full type expected for a situation in the card
type SituationWithMeta = TSituation & { id: number; createdAt: Date };

type SituationCardProps = {
  situation: SituationWithMeta;
  icon: string; // Pass icon explicitly
  onEdit: (situation: SituationWithMeta) => void;
  onDelete: (id: number) => void;
  onCreateConversation: (situation: SituationWithMeta) => void; // ✨ Add prop for create action
  isDeleting?: boolean;
  isEditing?: boolean;
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
      icon,
      onEdit,
      onDelete,
      onCreateConversation,
      isDeleting,
      isEditing,
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

    // ✨ Handle card click to trigger conversation creation
    const handleCardClick = () => {
      // Prevent triggering if edit/delete is pending? (Optional)
      if (isEditing || isDeleting) return;
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
          className="relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-orange-100 bg-white/90 p-5 text-left shadow-sm transition-all duration-300 hover:shadow-lg"
          onClick={handleCardClick} // ✨ Use the new handler
        >
          {/* Background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-orange-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-1 flex-col">
            {/* Top section: Icon, Title, Date */}
            <div className="mb-3 flex items-start">
              <div className="mr-4 rounded-lg bg-gradient-to-br from-orange-100 to-orange-200 p-3 text-3xl shadow-sm transition-transform duration-300 group-hover:scale-110">
                {icon} {/* Use passed icon */}
              </div>
              <div className="flex-1">
                <h3 className="line-clamp-1 text-lg font-medium text-gray-800 transition-colors duration-300 group-hover:text-orange-700">
                  {situation.place}
                </h3>
                <div className="mt-1 flex items-center text-xs text-gray-500">
                  <Clock className="mr-1 h-3 w-3" />
                  {getDaysAgo(situation.createdAt)}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-3 h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-100"></div>

            {/* Middle section: Roles, Goal */}
            <div className="flex-1">
              <div className="mb-2 transition-transform duration-300 group-hover:translate-x-1">
                <span className="text-sm font-medium text-gray-600">역할:</span>
                <span className="ml-1 text-sm text-gray-800">
                  {situation.userRole}
                </span>
              </div>
              <div className="mb-3 transition-transform duration-300 group-hover:translate-x-1">
                <span className="text-sm font-medium text-gray-600">AI:</span>
                <span className="ml-1 text-sm text-gray-800">
                  {situation.aiRole}
                </span>
              </div>
              <div className="origin-left transform transition-transform duration-300 group-hover:scale-[1.02]">
                <p className="line-clamp-2 rounded-md bg-orange-50 p-2 text-sm italic text-gray-700 shadow-sm transition-colors duration-300 group-hover:bg-orange-100/70">
                  {situation.goal || '목표가 설정되지 않았습니다.'}
                </p>
              </div>
            </div>

            {/* Bottom section: "Create Conversation" visual cue */}
            <div className="mt-4 flex justify-end">
              <span className="flex translate-x-2 transform items-center gap-2 rounded-md bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 text-sm text-white opacity-90 shadow-sm transition-colors hover:from-orange-600 hover:to-orange-700 group-hover:translate-x-0 group-hover:opacity-100 group-hover:shadow-md">
                대화 생성
                <ArrowRight className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons - Positioned absolutely */}
        <div className="absolute right-3 top-3 z-20 flex translate-y-1 transform space-x-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {/* Edit Button */}
          <Button
            variant="outline" // Using Button component
            size="icon" // Make it icon sized
            className="h-8 w-8 rounded-full bg-white p-0 shadow-sm transition-colors hover:bg-blue-50" // Adjusted styles
            onClick={handleEditClick}
            aria-label="편집"
            disabled={isEditing || isDeleting} // Disable if editing or deleting
          >
            <Pencil className="h-4 w-4 text-blue-500" />
          </Button>

          {/* Delete Button */}
          <Button
            variant="outline" // Using Button component
            size="icon" // Make it icon sized
            className="h-8 w-8 rounded-full bg-white p-0 shadow-sm transition-colors hover:bg-red-50" // Adjusted styles
            onClick={handleDeleteClick}
            aria-label="삭제"
            disabled={isDeleting || isEditing} // Disable if editing or deleting
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </div>
    );
  }
);

// Add display name for React DevTools
SituationCard.displayName = 'SituationCard';
