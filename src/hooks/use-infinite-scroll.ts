import { useEffect, useRef } from "react";

type useInfiniteScrollProps = {
  data: any;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

const useInfiniteScroll = ({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: useInfiniteScrollProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 컨테이너가 아직 렌더링되지 않았다면 무시
    if (!rootRef.current) return;

    // 기존 옵저버가 있으면 해제
    if (observerRef.current) observerRef.current.disconnect();

    const callback: IntersectionObserverCallback = (
      entries: IntersectionObserverEntry[]
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          // 마지막 아이템이 화면에 보이는 순간 --> fetchNextPage() 호출
          fetchNextPage();
        }
      });
    };

    // ! 옵저버 생성
    observerRef.current = new IntersectionObserver(callback, {
      root: rootRef.current,
      rootMargin: "0px",
      threshold: 0.9,
    });

    // !만약 "관찰 대상 DOM"이 이미 있을 경우 연결
    if (targetRef.current) {
      observerRef.current.observe(targetRef.current);
    }

    return () => observerRef.current?.disconnect();

    // !무한 스크롤 구현 시, 보통 “데이터가 추가되어 마지막 아이템이 새로 생길 때마다” 옵저버를 재연결해야 합니다.
  }, [data, fetchNextPage, rootRef.current, targetRef.current]);

  return {
    rootRef,
    targetRef,
  };
};

export default useInfiniteScroll;
