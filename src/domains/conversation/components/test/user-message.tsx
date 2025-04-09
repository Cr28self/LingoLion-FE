import { forwardRef } from 'react';
import { cn } from '@/lib/utils'; // 클래스 병합 함수 (맞는 경로 확인)
import { Sparkles } from 'lucide-react';

type UserMessageProps = {
  message: string;
  onMessageClick: () => void;
  isSelected: boolean;
};

export const UserMessage = forwardRef<HTMLDivElement, UserMessageProps>(
  ({ message, onMessageClick, isSelected }, ref) => {
    const hansFeedback = true;

    return (
      <div ref={ref} className="flex animate-fadeIn flex-col items-end gap-1">
        <div className="mr-1 text-xs font-medium text-gray-500">나</div>
        <div
          className={cn(
            'relative w-max max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-sm text-white shadow-md',
            isSelected ? 'scale-[1.02] ring-2 ring-red-400 ring-offset-2' : '',
            hansFeedback ? 'pb-5 pr-5' : '' // 피드백 버튼 공간 확보
          )}
        >
          <div className="font-medium leading-relaxed">{message}</div>

          <button
            onClick={onMessageClick}
            className={cn(
              'absolute right-1 top-1 z-10 rounded-full p-1 text-white/70 transition-all duration-150 hover:bg-white/20 hover:text-white active:scale-90'
            )}
            aria-label="View feedback for this message"
            title="View Feedback"
          >
            <Sparkles size={16} />
          </button>
        </div>
      </div>
    );
  }
);

UserMessage.displayName = 'UserMessage';
