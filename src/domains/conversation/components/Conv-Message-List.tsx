import { useLiveMessagesStore } from "../\bstore/useLiveMessagesStore";
import useAutoscrollBottom from "../hooks/use-autoscroll-bottom";
import { ReceiveMsgBox, SendMsgBox } from "./MsgBox";
import { useGetAllInfiniteMessage } from "../api/get-all-message";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import { useEffect, useRef } from "react";

function NoMessagePlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 space-y-4">
      <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center">
        <svg
          className="w-10 h-10 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </div>
      <p className="font-medium">대화를 시작해보세요!</p>
      <p className="text-sm max-w-md">
        LingoLion과 영어로 대화하며 회화 실력을 향상시킬 수 있습니다.
      </p>
    </div>
  );
}

const ConvMessageList = ({ convId }: { convId: string }) => {
  const pageLimit = 7;
  const liveMessages = useLiveMessagesStore((state) => state.liveMessages);

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } =
    useGetAllInfiniteMessage(convId, pageLimit);

  const flatMessages = data?.pages.flatMap((page) => page.data) || [];
  const reversedMessages = [...flatMessages].reverse();

  const { rootRef, targetRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  // Pass rootRef to the autoscroll hook
  const lastMessageRef = useAutoscrollBottom(rootRef, liveMessages);

  // ! 최초 강제 밑으로 스크롤 되는 동작이 일어났는지 판단하는 flag
  const initialScrollPerformedRef = useRef(false);

  // ! 새로운 데이터가 오기 전에 이전 scrollHeight를 저장하는 변수
  const prevScrollHeightRef = useRef<number | null>(null);

  // Effect 1: Maintain Scroll Position when Fetching Previous Messages
  useEffect(() => {
    const rootElement = rootRef.current;
    if (!rootElement) return;

    // Before new data (older messages) potentially renders and increases scrollHeight
    //  새로운 페이지의 데이터가 불러오는 중일때..... ( isFetchingNextPage=true )
    if (isFetchingNextPage) {
      // ! scrollHeight : 실제 내부 content의 높이
      prevScrollHeightRef.current = rootElement.scrollHeight;
    }
    // After new data has rendered
    else if (
      prevScrollHeightRef.current !== null &&
      !isFetchingNextPage &&
      hasNextPage
    ) {
      // * 여기 로직부터 새로운 데이터가 들어오면 scroll 처리
      // 새로운 페이지가 추가된 rootElement의 scrollHeight 추출
      const newScrollHeight = rootElement.scrollHeight;

      // !rootElement의 scrollTop을 조작해서 스크롤 강제 이동시킴 ( 왜 +=했는지 이해안됨? )
      rootElement.scrollTop += newScrollHeight - prevScrollHeightRef.current;

      // 초기화
      prevScrollHeightRef.current = null;
    }
  }, [isFetchingNextPage, flatMessages.length, rootRef, hasNextPage]);

  // Effect 2: Initial Scroll to Bottom Logic
  useEffect(() => {
    const rootElement = rootRef.current;

    // Only perform this scroll ONCE after the initial data load (+ potential first auto-fetch)
    if (initialScrollPerformedRef.current === true) return;

    const shouldScrollToBottom =
      rootElement &&
      !isFetching &&
      !isFetchingNextPage &&
      (flatMessages.length > pageLimit || flatMessages.length === 0);

    if (shouldScrollToBottom) {
      if (flatMessages.length > pageLimit) {
        console.log("Performing initial scroll to bottom");
        console.log("flatMsg 길이", flatMessages.length);
        console.log("root scrollHeight 값", rootElement.scrollHeight);
        // Scroll to the actual bottom of the content
        rootElement.scrollTo({
          top: rootElement.scrollHeight,
          behavior: "smooth",
        });
      } else {
        console.log("flatMsg 길이", flatMessages.length);
        console.log("No messages, marking initial scroll as done.");
      }

      // 공통 처리
      initialScrollPerformedRef.current = true;
    }
  }, [isFetching, isFetchingNextPage, flatMessages.length, rootRef]);

  return (
    <div
      id="Msg Area"
      className="relative flex-1 overflow-y-auto space-y-6 p-6 bg-[url('/chat-bg-pattern.png')] bg-opacity-5"
      ref={rootRef}
    >
      {/* Loading Indicator at the top */}
      {isFetchingNextPage && (
        <div className="text-center py-2 text-gray-500">
          Loading older messages...
        </div>
      )}
      <div className="space-y-6 inset-0">
        {/* Render reversed historical messages */}

        {/* start of reversedMessages */}
        {reversedMessages.length > 0 &&
          reversedMessages.map(({ id, sender, content }, index) => {
            // Target the second message (index 1) for triggering load of older messages
            console.log("아이디's content", id, content);
            const isTriggerElement = index === 1;
            const elemKey = `${convId}-${id}`; // Ensure unique key

            if (sender === "assistant") {
              return (
                <ReceiveMsgBox
                  // Assign targetRef only to the designated trigger element
                  ref={isTriggerElement ? targetRef : null}
                  key={elemKey}
                  text={content}
                />
              );
            } else {
              return (
                <SendMsgBox
                  // Assign targetRef only to the designated trigger element
                  ref={isTriggerElement ? targetRef : null}
                  key={elemKey}
                  text={content}
                />
              );
            }
          })}

        {/* end of reversedMessages */}

        {/* Placeholder shown only if NO historical AND NO live messages exist after initial load */}
        {reversedMessages.length === 0 && liveMessages.length === 0 && (
          <NoMessagePlaceholder />
        )}

        {/* start of Render live messages */}
        {liveMessages.map(({ role, content, order }, index) => {
          const elemKey = `${order}-${role}`; // Ensure unique

          const isLastMessage = index === liveMessages.length - 1;
          if (role === "assistant") {
            return (
              <ReceiveMsgBox
                ref={isLastMessage ? lastMessageRef : null}
                key={elemKey}
                text={content}
              />
            );
          } else {
            return (
              <SendMsgBox
                ref={isLastMessage ? lastMessageRef : null}
                key={elemKey}
                text={content}
              />
            );
          }
        })}
        {/* end of Render live messages */}
      </div>
    </div>
  );
};

export default ConvMessageList;
