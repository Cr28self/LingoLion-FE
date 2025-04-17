// src/components/FeedbackPanel/FeedbackListView.tsx

import React from 'react';
import { MessageSquare, Sparkles, X } from 'lucide-react';
import { FeedbackEntry } from '../../types/feedback';
import { FeedbackMessageCard } from './feedback-message-card';

interface FeedbackListViewProps {
  feedbackEntries: FeedbackEntry[];
  selectedFeedbackId: string | null;
  onSelectFeedback: (feedbackId: string | null) => void;
  onClose: () => void;
}

export const FeedbackListView: React.FC<FeedbackListViewProps> = ({
  feedbackEntries,
  selectedFeedbackId,
  onSelectFeedback,
  onClose,
}) => (
  <>
    {/* Header */}
    <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white p-4">
      <h2 className="text-lg font-semibold text-gray-800">Feedback History</h2>
      <button
        onClick={onClose}
        className="rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-200"
        aria-label="Close feedback panel"
      >
        <X size={20} />
      </button>
    </div>

    {/* Content */}
    <div className="flex-1 space-y-1 overflow-y-auto p-4">
      {feedbackEntries.length > 0 ? (
        feedbackEntries.map((entry) => (
          <FeedbackMessageCard
            key={entry.feedbackId}
            feedbackId={entry.feedbackId}
            messageText={entry.messageText}
            isSelected={entry.feedbackId === selectedFeedbackId}
            onClick={onSelectFeedback}
          />
        ))
      ) : (
        <div className="flex h-full flex-col items-center justify-center p-4 text-center text-gray-500">
          <MessageSquare size={40} className="mb-3 text-gray-400" />
          <p className="text-sm">No feedback available yet.</p>
          <p className="mt-1 text-xs">
            Send messages and click the{' '}
            <Sparkles size={12} className="mx-0.5 inline text-orange-400" />
            icon to see feedback.
          </p>
        </div>
      )}
    </div>
  </>
);
