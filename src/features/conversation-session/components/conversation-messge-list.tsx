import { useEffect, useMemo, useRef } from 'react';

import { useLiveMessagesStore } from '../store/use-live-messages-store.ts';
import useGetAllInfiniteMessage from '../api/get-all-message.ts';
import useInfiniteScroll from '@/hooks/use-infinite-scroll.ts';
import { useConvScrollManager } from '../hooks/use-conv-scroll-manager.tsx';
import ConversationMessageBox from './message.tsx';
import { useParams } from 'react-router-dom';
import useGetFeedback from '../api/get-feedback.ts';

const NoMessagePlaceholder = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4 text-center text-gray-500">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
        <svg
          className="h-10 w-10 text-orange-500"
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
      <p className="max-w-md text-sm">
        LingoLion과 영어로 대화하며 회화 실력을 향상시킬 수 있습니다.
      </p>
    </div>
  );
};

type ConversationMessageListProps = {
  userRole: string;
  aiRole: string;
};

export const ConversationMessageList = ({
  userRole,
  aiRole,
}: ConversationMessageListProps) => {
  const { data: feedbackData } = useGetFeedback();
  console.log('feedbackData', feedbackData);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const pageLimit = 7;

  const { conversationId } = useParams();
  const convId = conversationId as string;

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

  useConvScrollManager({
    rootRef,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    messageCount: flatMessages.length,
    pageLimit,
  });

  useEffect(() => {
    if (liveMessages.length > 0) {
      chatEndRef.current?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [liveMessages]);

  return (
    <div className="flex-1 space-y-6 overflow-y-auto p-4" ref={rootRef}>
      {/* ... message mapping ... */}

      {/* Loading Indicator at the top */}
      {/* {isFetchingNextPage && (
        <div className="py-2 text-center text-gray-500">
          <SkeletonChatConv />
        </div>
      )} */}

      {/* start of reversedMessages */}
      {flatMessages.length > 0 &&
        flatMessages.map((_, order, arr) => {
          // Target the second message (index 1) for triggering load of older messages

          const index = arr.length - 1 - order;
          const message = arr[index];

          const isTriggerElement = order === 1;
          const elemKey = `${convId}-${message.id}`; // Ensure unique key

          return (
            <ConversationMessageBox
              key={elemKey}
              message={message}
              role={{ userRole, aiRole }}
              // onMessageClick={() => {}}
              // isSelected={false}
              ref={isTriggerElement ? targetRef : null}
            />
          );
        })}

      {/* Placeholder shown only if NO historical AND NO live messages exist after initial load */}
      {flatMessages.length === 0 && liveMessages.length === 0 && (
        <NoMessagePlaceholder />
      )}

      {/* start of Render live messages */}
      {liveMessages.map((message) => {
        const elemKey = `${message.order}-${message.role}`; // Ensure unique

        return (
          <ConversationMessageBox
            message={message}
            role={{ userRole, aiRole }}
            key={elemKey}
            ref={null}
          />
        );
      })}

      <div ref={chatEndRef} className="h-11" />
    </div>
  );
};
