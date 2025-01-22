import React, { useEffect, useRef } from "react";

const useChatScroll = () => {
  const chatContainerRef = useRef<HTMLDivElement | null>(
    null
  ) as React.MutableRefObject<HTMLDivElement>;

  //   top: 0 → 스크롤을 최상단으로 이동
  // top: scrollHeight → 스크롤을 최하단으로 이동
  // top: 500 → 스크롤을 500px 위치로 이동

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current?.scrollHeight,
      behavior: "smooth",
    });
  }, [chatContainerRef.current?.scrollHeight]);

  return chatContainerRef;
};

export default useChatScroll;
