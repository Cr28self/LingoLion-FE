import { useCallback, useEffect, useRef } from 'react';

type useInfiniteScrollProps = {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

const useInfiniteScroll = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: useInfiniteScrollProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const targetRef = useRef<HTMLDivElement | null>(null);

  // !Memoize the callback to prevent recreation on every render
  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        console.log('infinite scrollㄴㄴㄴㄴㄴㄴㄴㄴㄴ - fetchNextPage', entry);
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          console.log('infinite scroll - fetchNextPage', entry);
          fetchNextPage();
        }
      });
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const rootElement = rootRef.current;
    const targetElement = targetRef.current;

    if (!rootElement) {
      // Root 컨테이너가 아직 렌더링되지 않았다면 무시
      return;
    }

    if (!observerRef.current) {
      // ! 옵저버 생성 ( 한번만  or if root changes (which is rare) )
      observerRef.current = new IntersectionObserver(handleIntersect, {
        root: rootElement,
        rootMargin: '0px',
        threshold: 0.9, // Trigger when 90% of the target is visible
      });
    }

    // Disconnect previous target if any before observing a new one
    observerRef.current.disconnect();

    // !만약 "관찰 대상 DOM"이 이미 있을 경우 연결
    if (targetElement) {
      observerRef.current.observe(targetElement);
    }

    // Cleanup function: Disconnect the observer when the component unmounts
    // or when dependencies change causing the effect to re-run.

    return () => observerRef.current?.disconnect();

    // !무한 스크롤 구현 시, 보통 “데이터가 추가되어 마지막 아이템이 새로 생길 때마다” 옵저버를 재연결해야 합니다.
  }, [handleIntersect, rootRef, targetRef]);

  return {
    rootRef,
    targetRef,
  };
};

export default useInfiniteScroll;
