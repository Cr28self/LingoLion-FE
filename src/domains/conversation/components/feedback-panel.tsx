import { ChevronLeft, Info, MessageSquare, Sparkles, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FeedbackMessageCard } from './feedback-message-card.tsx';
import { FeedbackDetailItem } from './feedback-detail-item.tsx';

const initialMessages = [
  {
    id: 1,
    sender: 'ai',
    name: '링고 (Barista)',
    avatar:
      'https://source.unsplash.com/random/150x150/?coffee-shop-logo,barista',
    text: 'Welcome to our coffee shop! What can I get for you today?',
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
  },
  {
    id: 2,
    sender: 'user',
    name: '나',
    text: "Hi! I'm looking for a recommendation. I usually enjoy black coffee.",
    timestamp: new Date(Date.now() - 9 * 60 * 1000),
    hasFeedback: true,
    feedbackId: 'fb1',
  },
  {
    id: 3,
    sender: 'ai',
    name: '링고 (Barista)',
    avatar:
      'https://source.unsplash.com/random/150x150/?coffee-shop-logo,barista',
    text: "That's great! If you enjoy black coffee, I recommend our single-origin pour-over—it's rich and flavorful.",
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
  },
  {
    id: 4,
    sender: 'user',
    name: '나',
    text: 'oh really?',
    timestamp: new Date(Date.now() - 7 * 60 * 1000),
    hasFeedback: true,
    feedbackId: 'fb2',
  },
  {
    id: 5,
    sender: 'ai',
    name: '링고 (Barista)',
    avatar:
      'https://source.unsplash.com/random/150x150/?coffee-shop-logo,barista',
    text: 'Yes! Can I help you with something specific about our coffee menu or perhaps the pour-over?',
    timestamp: new Date(Date.now() - 6 * 60 * 1000),
  },
  {
    id: 6,
    sender: 'user',
    name: '나',
    text: 'I wanna hot coffee',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    hasFeedback: true,
    feedbackId: 'fb3',
  },
  {
    id: 7,
    sender: 'ai',
    name: '링고 (Barista)',
    avatar:
      'https://source.unsplash.com/random/150x150/?coffee-shop-logo,barista',
    text: 'Sure! What kind of hot coffee are you in the mood for—espresso, cappuccino, or maybe a latte?',
    timestamp: new Date(Date.now() - 4 * 60 * 1000),
  },
  {
    id: 8,
    sender: 'user',
    name: '나',
    text: 'I wanna hot latte',
    timestamp: new Date(Date.now() - 3 * 60 * 1000),
    hasFeedback: true,
    feedbackId: 'fb4',
  },
  {
    id: 9,
    sender: 'ai',
    name: '링고 (Barista)',
    avatar:
      'https://source.unsplash.com/random/150x150/?coffee-shop-logo,barista',
    text: 'Excellent choice! Would you like it with any flavor, like vanilla or caramel?',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
  },
];

const initialFeedback = {
  fb1: {
    id: 'fb1',
    originalMessage:
      "Hi! I'm looking for a recommendation. I usually enjoy black coffee.",
    feedbackItems: [
      {
        type: 'expression',
        severity: 'info',
        text: 'Good opening! Clear and polite.',
        suggestion: null,
      },
      {
        type: 'grammar',
        severity: 'info',
        text: "'I usually enjoy' is perfectly fine.",
        suggestion:
          "Alternatively: 'I'm a fan of black coffee.' or 'Black coffee is my usual go-to.'",
      },
    ],
  },
  fb2: {
    id: 'fb2',
    originalMessage: 'oh really?',
    feedbackItems: [
      {
        type: 'grammar',
        severity: 'warning',
        text: "While common in speech, starting a sentence with 'oh' and not capitalizing 'Oh' is informal. Missing punctuation.",
        suggestion: "'Oh, really?'",
      },
      {
        type: 'expression',
        severity: 'info',
        text: "Shows engagement. You could also say: 'Is that so?' or 'Interesting!'",
        suggestion: null,
      },
    ],
  },
  fb3: {
    id: 'fb3',
    originalMessage: 'I wanna hot coffee',
    feedbackItems: [
      {
        type: 'grammar',
        severity: 'error',
        text: "'wanna' is very informal slang for 'want to'. It's better to use 'want a' or 'would like a' in this context.",
        suggestion:
          "'I want a hot coffee.' or 'I'd like a hot coffee, please.'",
      },
      {
        type: 'expression',
        severity: 'info',
        text: "Clearly states your desire. Using 'please' makes it more polite.",
        suggestion: null,
      },
    ],
  },
  fb4: {
    id: 'fb4',
    originalMessage: 'I wanna hot latte',
    feedbackItems: [
      {
        type: 'grammar',
        severity: 'error',
        text: "Similar to the previous message, 'wanna' is informal. Use 'want a' or 'would like a'.",
        suggestion: "'I want a hot latte.' or 'I'd like a hot latte.'",
      },
      {
        type: 'expression',
        severity: 'info',
        text: 'Direct and understandable.',
        suggestion: null,
      },
    ],
  },
};

export const FeedbackPanel = ({
  selectedFeedbackId, // ID of the message whose details are shown
  onSelectMessage, // Function to set the selectedFeedbackId
  onClose, // Function to close the panel
}) => {
  const [messages, setMessages] = useState(initialMessages);
  const [feedbackData, setFeedbackData] = useState(initialFeedback);

  const userMessagesWithFeedback = useMemo(
    () => messages.filter((msg) => msg.sender === 'user' && msg.hasFeedback),
    [messages]
  );

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
