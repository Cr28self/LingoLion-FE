import { cn } from '@/lib/utils.ts';
import { Sparkles } from 'lucide-react';

// NEW: Card for listing messages in the sidebar
export const FeedbackMessageCard = ({ message, onClick, isSelected }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group mb-2 w-full rounded-lg border p-3 text-left transition-colors duration-200',
        isSelected
          ? 'border-red-300 bg-gradient-to-r from-orange-100 to-red-100 shadow-md'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
      )}
    >
      <div className="flex items-center justify-between">
        <p
          className={cn(
            'truncate text-sm text-gray-700 group-hover:text-gray-900',
            isSelected ? 'font-medium text-red-800' : ''
          )}
          style={{ maxWidth: 'calc(100% - 30px)' }}
        >
          {' '}
          {/* Ensure text doesn't overlap icon */}"{message.text}"
        </p>
        <Sparkles
          size={16}
          className={cn(
            'ml-2 flex-shrink-0',
            isSelected
              ? 'text-red-500'
              : 'text-orange-400 opacity-70 group-hover:opacity-100'
          )}
        />
      </div>
    </button>
  );
};
