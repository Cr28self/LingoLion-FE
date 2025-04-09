import { useEffect, useRef } from 'react';

type UseChatScrollManagerProps = {
  /** Ref attached to the scrollable chat container element. */
  rootRef: React.RefObject<HTMLElement>;
  /** Indicates if older messages are currently being fetched (for infinite scroll). */
  isFetchingNextPage: boolean;
  /** Indicates if there are more older messages to fetch. */
  hasNextPage: boolean | undefined;
  /** Indicates if the initial batch of messages is being fetched. */
  isFetching: boolean;
  /** The total number of historical messages currently rendered. */
  messageCount: number;
  /** The number of messages loaded per page (used for initial scroll logic). */
  pageLimit: number;
};

/**
 * Custom hook to manage complex scrolling behaviors in a chat interface:
 * 1. Maintains scroll position when loading older messages via infinite scroll.
 * 2. Performs an initial scroll to the bottom when the chat loads (only once).
 */
export const useConvScrollManager = ({
  rootRef,
  isFetchingNextPage,
  hasNextPage,
  isFetching,
  messageCount,
  pageLimit,
}: UseChatScrollManagerProps): void => {
  // Ref to track if the initial scroll-to-bottom action has been performed.
  const initialScrollPerformedRef = useRef(false);
  // Ref to store the scroll height before new older messages are added.
  const prevScrollHeightRef = useRef<number | null>(null);
  console.log('useConvScrollManager');

  // Effect 1: Maintain Scroll Position when Fetching Previous Messages
  useEffect(() => {
    console.log('이것이 마지막에 실행되나??');
    const rootElement = rootRef.current;
    if (!rootElement) return;

    // Store the current scroll height *before* new older messages potentially render.
    if (isFetchingNextPage) {
      prevScrollHeightRef.current = rootElement.scrollHeight;
    }
    // After new older messages have rendered (isFetchingNextPage is false)
    // and we previously stored a scroll height.
    else if (
      prevScrollHeightRef.current !== null &&
      !isFetchingNextPage &&
      // Check hasNextPage to ensure this logic applies only when loading older pages,
      // not necessarily on the very first load if it fetches multiple pages initially.
      // Although the primary guard is prevScrollHeightRef being non-null.
      hasNextPage !== false // Use !== false to handle undefined case safely
    ) {
      const newScrollHeight = rootElement.scrollHeight;
      // Adjust scrollTop to keep the view stable.
      // Increase scrollTop by the amount of height added at the top.
      rootElement.scrollTop += newScrollHeight - prevScrollHeightRef.current;

      // Reset the stored height.
      prevScrollHeightRef.current = null;
    }

    // Cleanup isn't strictly necessary here, but good practice if needed later.
    // return () => { prevScrollHeightRef.current = null; };

    // Dependencies: Trigger when fetching state changes or when message count changes (indicating new data rendered).
    // Include rootRef and hasNextPage as they are used in the effect logic.
  }, [isFetchingNextPage, messageCount, rootRef, hasNextPage]);

  // Effect 2: Initial Scroll to Bottom Logic
  useEffect(() => {
    const rootElement = rootRef.current;

    // Only perform this scroll ONCE.
    if (initialScrollPerformedRef.current === true || !rootElement) {
      return;
    }

    console.log(
      'initialScrollPerformedRef.current',
      initialScrollPerformedRef.current
    );

    // Determine if conditions are right for the initial scroll.
    // Should happen only after initial loading is finished.
    console.log('이즈페칭', isFetching);
    console.log('이즈페칭넥스트페이지', isFetchingNextPage);
    console.log('메시지카운트', messageCount);
    console.log('페이지리밋', pageLimit);
    const shouldScrollToBottom =
      !isFetching && // Initial load must be complete
      !isFetchingNextPage && // Infinite scroll must not be active
      (messageCount > pageLimit || messageCount === 0); // Enough messages to scroll OR no messages

    if (shouldScrollToBottom) {
      console.log('Initial scroll to bottom triggered.');
      if (messageCount > pageLimit) {
        console.log(`Scrolling to bottom (${rootElement.scrollHeight})`);
        // Use 'auto' behavior for initial scroll to avoid potential conflicts
        // or jarring jumps if content is still settling. 'smooth' can be used if preferred.
        rootElement.scrollTo({
          top: rootElement.scrollHeight,
          behavior: 'auto', // Consider 'auto' for initial load
        });
      } else {
        // Even if there are few messages (<= pageLimit and > 0), or zero messages,
        // we still mark the initial check as done.
        console.log(
          `Initial scroll check complete. Message count (${messageCount}) <= pageLimit (${pageLimit}) or is 0. Marking as done.`
        );
      }

      // Mark as performed regardless of whether actual scrolling happened.
      initialScrollPerformedRef.current = true;
    } else {
      // Log why it didn't scroll initially if needed for debugging
      // console.log('Initial scroll conditions not met:', { isFetching, isFetchingNextPage, messageCount });
    }

    // Dependencies: Trigger when loading states change or message count changes,
    // ensuring it runs once the initial data is ready.
  }, [isFetching, isFetchingNextPage, messageCount, rootRef, pageLimit]); // Added pageLimit dependency

  // No return value needed as the hook performs side effects.
};
