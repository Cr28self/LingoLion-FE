// src/components/FeedbackPanel/FeedbackMessageCard.tsx

import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils'; // Adjust path if needed

interface FeedbackMessageCardProps {
  feedbackId: string;
  messageText: string;
  isSelected: boolean;
  onClick: (feedbackId: string) => void;
}

export const FeedbackMessageCard: React.FC<FeedbackMessageCardProps> = ({
  feedbackId,
  messageText,
  isSelected,
  onClick,
}) => {
  return (
    <button
      onClick={() => onClick(feedbackId)}
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
          "{messageText}"
        </p>
        <Sparkles
          size={16}
          aria-hidden="true"
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
