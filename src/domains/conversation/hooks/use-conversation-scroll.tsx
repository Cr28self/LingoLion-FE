import React, { useEffect, useRef, useState } from "react";

const useConversationScroll = (deps: React.DependencyList) => {
  // Keep track if this is the initial render
  const isInitialRender = useRef(true);
  // Used to track if we should scroll to bottom
  const shouldScrollToBottom = useRef(true);

  const chatContainerRef = useRef<HTMLDivElement | null>(
    null
  ) as React.MutableRefObject<HTMLDivElement>;

  // For the initial render and new messages
  useEffect(() => {
    if (!chatContainerRef.current) {
      return;
    }

    const { scrollHeight, clientHeight, scrollTop } = chatContainerRef.current;

    // Check if user is near bottom (within 100px)
    const isNearBottom = scrollHeight - (clientHeight + scrollTop) < 100;

    // Scroll to bottom if:
    // 1. It's the initial render
    // 2. User is already near the bottom and new messages arrive
    if (isInitialRender.current || isNearBottom) {
      requestAnimationFrame(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: isInitialRender.current ? "auto" : "smooth",
          });
        }
      });
    }

    // No longer initial render after first execution
    isInitialRender.current = false;
  }, deps);

  // Add a scroll event listener to track user scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!chatContainerRef.current) return;

      const { scrollHeight, clientHeight, scrollTop } =
        chatContainerRef.current;
      // If not near bottom, don't auto-scroll on new messages
      shouldScrollToBottom.current =
        scrollHeight - (clientHeight + scrollTop) < 100;
    };

    const currentRef = chatContainerRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return chatContainerRef;
};

export default useConversationScroll;
