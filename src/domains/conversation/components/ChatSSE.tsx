import { Suspense } from "react";
import { useGetAllInfiniteMessage } from "../api/get-all-message";

import { ReceiveMsgBox, SendMsgBox } from "./MsgBox";

import { useLiveMessagesStore } from "../\bstore/useLiveMessagesStore";
import ConvInputForm from "./Conv-Input-Form";
import useAutoscrollBottom from "../hooks/use-autoscroll-bottom";

function ChatData({ convId }: { convId: string }) {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetAllInfiniteMessage(convId);

  console.log(data);

  const flatMessages = data?.pages.flatMap((page) => page.data) || [];
  const reversedMessages = [...flatMessages].reverse();

  return (
    <>
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
          const elemKey = `${createdAt}-${sender}`; // 고유한 키 생성
          if (sender === "assistant") {
            return <ReceiveMsgBox key={elemKey} text={content} />;
          } else {
            return <SendMsgBox key={elemKey} text={content} />;
          }
        })
      )}
    </>
  );
}

const ChatSSE = ({ convId }: { convId: string }) => {
  const liveMessages = useLiveMessagesStore((state) => state.liveMessages);

  const lastMessageRef = useAutoscrollBottom(liveMessages);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        id="Msg Area"
        className="relative flex-1 overflow-y-auto space-y-6 p-6 bg-[url('/chat-bg-pattern.png')] bg-opacity-5"
      >
        <div className="space-y-6 inset-0">
          <ChatData convId={convId} />
          {liveMessages.map(({ role, content, order }, index) => {
            const elemKey = `${order}-${role}`; // 고유한 키 생성

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
        </div>
      </div>

      <ConvInputForm convId={convId} />
    </Suspense>
  );
};

export default ChatSSE;
