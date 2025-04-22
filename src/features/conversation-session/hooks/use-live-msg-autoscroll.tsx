import React, { useLayoutEffect, useRef } from 'react';

const useLiveMsgAutoscroll = (
  scrollContainerRef: React.RefObject<HTMLElement>,
  deps: React.DependencyList
) => {
  const lastMessageRef = useRef<HTMLDivElement>(null);

  // Track if user is actively scrolling up
  const isUserScrollingUpRef = useRef<boolean>(false);

  // Use useLayoutEffect to run after DOM mutations but before paint
  useLayoutEffect(() => {
    const container = scrollContainerRef.current;

    if (container) {
      // Simple check: If scrolled up significantly, maybe don't auto-scroll
      // This threshold needs tuning based on UX preference
      const scrollThreshold = 250; // Pixels from bottom

      const isScrolledUp =
        container.scrollHeight - container.scrollTop - container.clientHeight >
        scrollThreshold;

      // Check if the last message exists and the user isn't scrolled up

      if (
        lastMessageRef.current &&
        !isScrolledUp &&
        !isUserScrollingUpRef.current
      ) {
        // ! lastMessageRef의 크기변화 --> scrollIntoView 실행 ㄱㄱ?
        lastMessageRef.current.scrollIntoView({
          behavior: 'smooth', // Changed to smooth
          block: 'end', // Aligns the bottom of the element to the bottom of the scroller
        });
      } else if (lastMessageRef.current && isScrolledUp) {
        // later?
      }
    }
  }, [deps, scrollContainerRef]);

  //! Add scroll listener to track user scrolling up ( 나중에 debounce로 최적화 가능?? )
  // useEffect(() => {
  //   const container = scrollContainerRef.current;
  //   let scrollTimeout: NodeJS.Timeout | null = null;
  //   console.log('scrollContainer-useEffect');

  //   const handleScroll = () => {
  //     console.log('handleScroll');
  //     if (container) {
  //       const isNearBottom =
  //         container.scrollHeight -
  //           container.scrollTop -
  //           container.clientHeight <
  //         50;
  //       // Small threshold near bottom

  //       if (!isNearBottom) {
  //         // 1. 사용자가 상단 쪽으로 스크롤을 올리는 중임을 기록
  //         isUserScrollingUpRef.current = true; // User scrolled up

  //         // Reset the flag after a delay if the user stops scrolling up

  //         // 2. 만약 스크롤이 잠시 멈추면, 일정 시간 후 isUserScrollingUpRef를 다시 false로 돌림
  //         if (scrollTimeout) clearTimeout(scrollTimeout);

  //         scrollTimeout = setTimeout(() => {
  //           isUserScrollingUpRef.current = false;
  //         }, 300); // Adjust delay as needed
  //       } else {
  //         isUserScrollingUpRef.current = false; // User is near/at bottom
  //         if (scrollTimeout) clearTimeout(scrollTimeout);
  //       }
  //     }
  //   };

  //   container?.addEventListener('scroll', handleScroll);

  //   return () => {
  //     container?.removeEventListener('scroll', handleScroll);
  //     if (scrollTimeout) clearTimeout(scrollTimeout);
  //   };
  // }, [scrollContainerRef]);

  return lastMessageRef; // Return the ref to be attached to the last message
};

export default useLiveMsgAutoscroll;
