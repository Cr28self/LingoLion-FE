import React, { useEffect, useRef } from "react";

const useAutoscrollBottom = (deps: React.DependencyList) => {
  // 메시지 하나를 렌더링하는 부분에서
  const lastMessageRef = useRef<HTMLDivElement>(
    null
  ) as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [deps]);

  return lastMessageRef;
};

export default useAutoscrollBottom;
