import { ChevronLeft, Info, MessageSquare, Sparkles, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { FeedbackMessageCard } from './feedback-message-card';
import { FeedbackDetailItem } from './feedback-detail-item';

export const FeedbackPanel = ({
  feedbackData,
  userMessagesWithFeedback, // List of user messages having feedback
  selectedFeedbackId, // ID of the message whose details are shown
  onSelectMessage, // Function to set the selectedFeedbackId
  onClose, // Function to close the panel
}) => {
  const feedbackDetails = feedbackData[selectedFeedbackId];
  const panelRef = useRef(null);

  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedFeedbackId]); // Scroll to top when selection changes

  // View: Show list of messages with feedback
  const renderMessageListView = () => (
    <>
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white p-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Feedback History
        </h2>
        <button
          onClick={onClose}
          className="rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-200"
          aria-label="Close feedback panel"
        >
          {' '}
          <X size={20} />{' '}
        </button>
      </div>
      <div className="flex-1 space-y-1 overflow-y-auto p-4">
        {userMessagesWithFeedback.length > 0 ? (
          userMessagesWithFeedback.map((msg) => (
            <FeedbackMessageCard
              key={msg.id}
              message={msg}
              isSelected={msg.feedbackId === selectedFeedbackId}
              onClick={() => onSelectMessage(msg.feedbackId)}
            />
          ))
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-4 text-center text-gray-500">
            <MessageSquare size={40} className="mb-3 text-gray-400" />
            <p className="text-sm">No feedback available yet.</p>
            <p className="mt-1 text-xs">
              Send messages and click the{' '}
              <Sparkles size={12} className="mx-0.5 inline text-orange-400" />{' '}
              icon to see feedback.
            </p>
          </div>
        )}
      </div>
    </>
  );

  // View: Show details for a selected message
  const renderDetailView = () => (
    <>
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white p-4">
        <button
          onClick={() => onSelectMessage(null)}
          className="-ml-1 flex items-center p-1 text-sm text-gray-600 transition-colors hover:text-gray-900"
        >
          <ChevronLeft size={18} className="mr-1" /> Back to List
        </button>
        <h2 className="text-right text-lg font-semibold text-gray-800">
          Details
        </h2>
        {/* Keep close button if needed, or rely on Back */}
        {/* <button onClick={onClose} className="text-gray-500 hover:bg-gray-200 p-1 rounded-full transition-colors" aria-label="Close feedback panel"> <X size={20} /> </button> */}
      </div>
      <div className="flex-1 space-y-5 overflow-y-auto p-5">
        {feedbackDetails ? (
          <>
            <div>
              <p className="mb-1 text-xs font-medium text-gray-500">
                Original Message:
              </p>
              <p className="rounded-lg border border-gray-200 bg-gray-100 p-3 text-sm italic text-gray-700">
                "{feedbackDetails.originalMessage}"
              </p>
            </div>
            <hr className="my-4 border-gray-200" />
            <div>
              <p className="mb-2 text-xs font-medium text-gray-500">
                Analysis:
              </p>
              {feedbackDetails.feedbackItems.map((item, index) => (
                <FeedbackDetailItem key={index} item={item} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-4 text-center text-gray-500">
            <Info size={40} className="mb-3 text-gray-400" />
            <p className="text-sm">Could not load feedback details.</p>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div
      ref={panelRef}
      className="flex h-full flex-col overflow-hidden bg-white shadow-lg"
    >
      {selectedFeedbackId ? renderDetailView() : renderMessageListView()}
    </div>
  );
};
