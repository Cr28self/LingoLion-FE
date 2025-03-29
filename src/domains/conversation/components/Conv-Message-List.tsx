import { useLiveMessagesStore } from "../\bstore/useLiveMessagesStore";
import useLiveMsgAutoscroll from "../hooks/use-live-msg-autoscroll";
import { useGetAllInfiniteMessage } from "../api/get-all-message";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import { useMemo } from "react";
import { ConvMessageBox } from "./Conv-Message-Box";
import { useConvScrollManager } from "../hooks/use-conv-scroll-manager";

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

  const flatMessages = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) || [];
  }, [data]);

  const { rootRef, targetRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  // Pass rootRef to the autoscroll hook
  const lastMessageRef = useLiveMsgAutoscroll(rootRef, liveMessages);

  // *** Use the new custom hook for managing scroll position ***
  useConvScrollManager({
    rootRef,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    messageCount: flatMessages.length, // Pass the count of historical messages
    pageLimit, // Pass pageLimit for initial scroll logic
  });

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
        {flatMessages.length > 0 &&
          flatMessages.map((_, order, arr) => {
            // Target the second message (index 1) for triggering load of older messages

            const index = arr.length - 1 - order;
            const message = arr[index];

            const isTriggerElement = order === 1;
            const elemKey = `${convId}-${message.id}`; // Ensure unique key

            return (
              <ConvMessageBox
                key={elemKey}
                message={message}
                ref={isTriggerElement ? targetRef : null}
              />
            );
          })}

        {/* end of reversedMessages */}

        {/* Placeholder shown only if NO historical AND NO live messages exist after initial load */}
        {flatMessages.length === 0 && liveMessages.length === 0 && (
          <NoMessagePlaceholder />
        )}

        {/* start of Render live messages */}
        {liveMessages.map((message, index) => {
          const elemKey = `${message.order}-${message.role}`; // Ensure unique

          const isLastMessage = index === liveMessages.length - 1;

          return (
            <ConvMessageBox
              message={message}
              key={elemKey}
              ref={isLastMessage ? lastMessageRef : null}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ConvMessageList;
