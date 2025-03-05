import React, { useEffect, useRef } from "react";

const useConversationScroll = (deps: React.DependencyList) => {
  const chatContainerRef = useRef<HTMLDivElement | null>(
    null
  ) as React.MutableRefObject<HTMLDivElement>;
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (!chatContainerRef.current) return;

    const { scrollHeight, clientHeight, scrollTop } = chatContainerRef.current;
    const isNearBottom = scrollHeight - (clientHeight + scrollTop) < 100;

    // 초기 로드 또는 새 메시지가 하단 근처에 있을 때만 스크롤
    if (isInitialLoad.current || isNearBottom) {
      requestAnimationFrame(() => {
        chatContainerRef.current?.scrollTo({
          top: scrollHeight,
          behavior: isInitialLoad.current ? "auto" : "smooth",
        });
      });
    }

    isInitialLoad.current = false;
  }, [deps]); // 외부에서 전달된 의존성 배열 사용

  return chatContainerRef;
};

export default useConversationScroll;
