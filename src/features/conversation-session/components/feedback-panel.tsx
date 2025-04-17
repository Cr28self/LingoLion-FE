import React from 'react';
import { cn } from '@/lib/utils'; // Adjust path if needed
import useMediaQuery from '@/hooks/use-media-query'; // Adjust path if needed
import { useConversationUIStore } from '../store/use-conversation-ui-store';
import { FeedbackEntry } from '../types/feedback';
import { mockFeedbackEntries } from '../mock/feedback-data-mock';
import { FeedbackListView } from './feedback-panel/feedback-list-view';
import { FeedbackDetailView } from './feedback-panel/feedback-detail-view';

export const FeedbackPanel = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  // State from Zustand store
  const isFeedbackPanelOpen = useConversationUIStore(
    (state) => state.isFeedbackPanelOpen
  );
  const selectedFeedbackId = useConversationUIStore(
    (state) => state.selectedFeedbackId
  );
  const toggleFeedbackPanel = useConversationUIStore(
    (state) => state.toggleFeedbackPanel
  );
  const setSelectedFeedbackId = useConversationUIStore(
    (state) => state.setSelectedFeedbackId
  );

  // --- Data ---
  // Replace mock data import with actual data fetching logic when ready
  const feedbackEntries: FeedbackEntry[] = mockFeedbackEntries;

  // Find the currently selected feedback details
  const selectedFeedbackDetails = React.useMemo(() => {
    if (!selectedFeedbackId) return null;
    return (
      feedbackEntries.find(
        (entry) => entry.feedbackId === selectedFeedbackId
      ) || null
    );
  }, [selectedFeedbackId, feedbackEntries]);

  // --- Handlers ---
  const handleSelectFeedback = (feedbackId: string | null) => {
    setSelectedFeedbackId(feedbackId);
  };

  const handleGoBack = () => {
    setSelectedFeedbackId(null); // Clear selection to go back to list view
  };

  const handleClosePanel = () => {
    toggleFeedbackPanel(); // Use the store action to close
    setSelectedFeedbackId(null); // Also reset selection when closing
  };

  // --- Render Logic ---

  // Mobile View (Example: Overlay)
  if (!isDesktop) {
    return (
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ease-in-out',
          isFeedbackPanelOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={handleClosePanel} // Close on overlay click
        aria-hidden={!isFeedbackPanelOpen}
      >
        <aside
          className={cn(
            'absolute inset-y-0 right-0 z-50 w-4/5 max-w-md transform border-l border-gray-200 bg-white shadow-lg transition-transform duration-300 ease-in-out',
            isFeedbackPanelOpen ? 'translate-x-0' : 'translate-x-full'
          )}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside panel
          role="dialog" // Better semantics for overlay panels
          aria-modal="true"
          aria-labelledby="feedback-panel-title" // Add an ID to a title element inside
        >
          <div className="flex h-full flex-col overflow-hidden">
            {/* Add an h2 with id="feedback-panel-title" inside list/detail view headers */}
            {selectedFeedbackDetails ? (
              <FeedbackDetailView
                feedbackDetails={selectedFeedbackDetails}
                onGoBack={handleGoBack}
                // onClose={handleClosePanel} // Can add explicit close if needed
              />
            ) : (
              <FeedbackListView
                feedbackEntries={feedbackEntries}
                selectedFeedbackId={selectedFeedbackId}
                onSelectFeedback={handleSelectFeedback}
                onClose={handleClosePanel}
              />
            )}
          </div>
        </aside>
      </div>
    );
  }

  // Desktop View (Sidebar)
  return (
    <aside
      className={cn(
        'transition-transform duration-300 ease-in-out', // Base transition
        'md:relative md:z-auto md:border-l md:border-gray-200/50 md:bg-white md:shadow-none', // Desktop base styles
        'md:w-1/3 lg:w-2/5 xl:w-1/3', // Desktop widths
        isFeedbackPanelOpen
          ? 'md:block md:translate-x-0' // Desktop open
          : 'md:hidden' // Desktop closed - simpler than translate
        // Mobile absolute positioning (less relevant now as it's handled above)
        // 'absolute inset-y-0 right-0 z-20 w-full transform bg-white shadow-lg',
        // isFeedbackPanelOpen ? 'translate-x-0' : 'translate-x-full'
      )}
      aria-hidden={!isFeedbackPanelOpen && isDesktop} // Hidden only on desktop when closed
      // Consider adding aria-controls relationship to the button that opens this panel
    >
      <div className="flex h-full flex-col overflow-hidden">
        {selectedFeedbackDetails ? (
          <FeedbackDetailView
            feedbackDetails={selectedFeedbackDetails}
            onGoBack={handleGoBack}
          />
        ) : (
          <FeedbackListView
            feedbackEntries={feedbackEntries}
            selectedFeedbackId={selectedFeedbackId}
            onSelectFeedback={handleSelectFeedback}
            onClose={handleClosePanel} // Close button closes the panel
          />
        )}
      </div>
    </aside>
  );
};
