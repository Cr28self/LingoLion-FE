// src/components/FeedbackPanel/FeedbackDetailView.tsx

import React from 'react';
import { ChevronLeft, Info } from 'lucide-react';
import { FeedbackEntry } from '../../types/feedback';
import { FeedbackDetailItem } from './feedback-detail-item';

interface FeedbackDetailViewProps {
  feedbackDetails: FeedbackEntry;
  onGoBack: () => void;
  // onClose?: () => void; // Optional: If a close button is needed here too
}

export const FeedbackDetailView: React.FC<FeedbackDetailViewProps> = ({
  feedbackDetails,
  onGoBack,
  // onClose,
}) => (
  <>
    {/* Header */}
    <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white p-4">
      <button
        onClick={onGoBack}
        className="-ml-1 flex items-center rounded p-1 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
      >
        <ChevronLeft size={18} className="mr-1" /> Back to List
      </button>
      <h2 className="text-right text-lg font-semibold text-gray-800">
        Details
      </h2>
      {/* {onClose && <button onClick={onClose} ...><X/></button>} */}
    </div>

    {/* Content */}
    <div className="flex-1 space-y-5 overflow-y-auto p-5">
      <div>
        <p className="mb-1 text-xs font-medium text-gray-500">
          Original Message:
        </p>
        <p className="rounded-lg border border-gray-200 bg-gray-100 p-3 text-sm italic text-gray-700">
          "{feedbackDetails.messageText}"
        </p>
      </div>
      <hr className="my-4 border-gray-200" />
      <div>
        <p className="mb-2 text-xs font-medium text-gray-500">Analysis:</p>
        {feedbackDetails.feedbackItems.length > 0 ? (
          feedbackDetails.feedbackItems.map((item, index) => (
            <FeedbackDetailItem key={index} item={item} />
          ))
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-4 text-center text-gray-500">
            <Info size={30} className="mb-2 text-gray-400" />
            <p className="text-sm">No analysis details found for this item.</p>
          </div>
        )}
      </div>
    </div>
  </>
);
