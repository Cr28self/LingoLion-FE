import { useEffect, useRef } from "react";
import useConversationScroll from "../hooks/use-conversation-scroll";
import { ReceiveMsgBox, SendMsgBox } from "./MsgBox";
import { useGetAllInfiniteMessage } from "../api/get-all-message";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";

type MessageList = {
  convId: string;
};

const MessageList = ({ convId }: MessageList) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetAllInfiniteMessage(convId);

  const flatMessages = data?.pages.flatMap((page) => page.data) || [];
  const reversedMessages = [...flatMessages].reverse();

  // Ref to store previous height before loading new messages
  const prevScrollHeightRef = useRef<number>(0);
  // Ref to know if we're loading older messages (to maintain scroll position)
  const isLoadingOlderRef = useRef<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Custom hook for scrolling to bottom on new messages
  const convContainerRef = useConversationScroll([reversedMessages]);

  // Infinite scroll implementation
  const { rootRef, targetRef } = useInfiniteScroll({
    data: reversedMessages,
    fetchNextPage: () => {
      if (containerRef.current) {
        // Store current scroll height before fetching
        prevScrollHeightRef.current = containerRef.current.scrollHeight;
        isLoadingOlderRef.current = true;
      }
      fetchNextPage();
    },
    hasNextPage,
    isFetchingNextPage,
  });

  // Handle scroll position after loading older messages
  useEffect(() => {
    if (
      isLoadingOlderRef.current &&
      !isFetchingNextPage &&
      containerRef.current &&
      prevScrollHeightRef.current > 0
    ) {
      const newScrollHeight = containerRef.current.scrollHeight;
      const scrollDiff = newScrollHeight - prevScrollHeightRef.current;

      // Adjust scroll position to maintain the same relative view
      containerRef.current.scrollTop = scrollDiff;

      // Reset flags
      isLoadingOlderRef.current = false;
      prevScrollHeightRef.current = 0;
    }
  }, [isFetchingNextPage]);

  // Set both refs to the same element
  const setRootRef = (element: HTMLDivElement | null) => {
    if (element) {
      rootRef.current = element;
      containerRef.current = element;
      convContainerRef.current = element;
    }
  };

  return (
    <div
      id="Msg Area"
      className="relative flex-1 overflow-y-auto space-y-6 p-6 bg-[url('/chat-bg-pattern.png')] bg-opacity-5"
      ref={setRootRef}
    >
      <div className="space-y-6 inset-0">
        {reversedMessages.length === 0 ? (
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
        ) : (
          reversedMessages.map(({ sender, content, createdAt }, index) => {
            // Only the first element (oldest message) gets the target ref for infinite scroll
            const isFirstMessage = index === 0;
            if (sender === "assistant") {
              return (
                <ReceiveMsgBox
                  key={createdAt}
                  text={content}
                  ref={isFirstMessage ? targetRef : null}
                />
              );
            } else {
              return (
                <SendMsgBox
                  key={createdAt}
                  text={content}
                  ref={isFirstMessage ? targetRef : null}
                />
              );
            }
          })
        )}
      </div>
    </div>
  );
};

export default MessageList;
