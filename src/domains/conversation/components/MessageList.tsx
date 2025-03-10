import React, { useMemo, useState } from "react";
import useConversationScroll from "../hooks/use-conversation-scroll";
import { ReceiveMsgBox, SendMsgBox } from "./MsgBox";
import { useGetAllMessage } from "../api/get-all-message";
import { Entity } from "@/types/api";

type MessageList = {
  convId: string;
};

type TConvMsg = Entity<{
  role: "AI" | "USER";
  msg: string;
}>;

const MessageList = ({ convId }: MessageList) => {
  // ! ReceiveMsg, SendMsg 임시로 구현
  const [allMsg, setAllMsg] = useState<TConvMsg[]>([]);

  const { data } = useGetAllMessage({ convId, cursor: "" });

  const reversedMessages = useMemo(
    () => [...(data?.data || [])].reverse(),
    [data]
  );

  const pageInfo = data?.pageInfo;

  const convContainerRef = useConversationScroll([reversedMessages]); // 의존성 배열 추가
  return (
    <div
      id="Msg Area"
      className="flex-1 overflow-y-auto space-y-6 p-6 bg-[url('/chat-bg-pattern.png')] bg-opacity-5"
      ref={convContainerRef}
    >
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
        reversedMessages.map(({ sender, content, createdAt }) => {
          if (sender === "assistant") {
            return <ReceiveMsgBox key={createdAt} text={content} />;
          } else {
            return <SendMsgBox key={createdAt} text={content} />;
          }
        })
      )}
    </div>
  );
};

export default MessageList;
