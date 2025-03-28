import { MutableRefObject, Suspense, useRef, useState } from "react";
import { useGetAllInfiniteMessage } from "../api/get-all-message";
import { useSendSSEMessage } from "../api/send-sse-message";
import { ReceiveMsgBox, SendMsgBox } from "./MsgBox";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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
  const { handleSend, input, setInput, liveMessages, isStreaming } =
    useSendSSEMessage(convId);

  const handleAbort = () => {};

  const [isComposing, setIsComposing] = useState(false); // 추가된 부분

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustTextareaHeight = (
    textarea: MutableRefObject<HTMLTextAreaElement>
  ) => {
    textarea.current.style.height = "auto"; // 높이를 초기화
    textarea.current.style.height = `${textarea.current.scrollHeight}px`; // 스크롤 높이에 맞춰 높이 조정
  };

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
            if (role === "assistant") {
              return <ReceiveMsgBox key={elemKey} text={content} />;
            } else {
              return <SendMsgBox key={elemKey} text={content} />;
            }
          })}
        </div>
      </div>

      <form
        id="Input Area"
        className="flex p-4 bg-white border-t border-gray-200 shadow-inner"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <div className="flex items-center w-full bg-gray-100 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-orange-300 focus-within:bg-white transition-all duration-300">
          <Textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (textAreaRef.current)
                adjustTextareaHeight(
                  textAreaRef as MutableRefObject<HTMLTextAreaElement>
                );
            }}
            placeholder="메시지를 입력하세요..."
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
              if (e.key === "Enter" && !e.shiftKey && !isComposing) {
                e.preventDefault();
                handleSend();
              }
            }}
            ref={textAreaRef}
            className="flex-1 bg-transparent border-0 focus:ring-0 focus:outline-none focus-visible:outline-none focus-visible:ring-0 resize-none max-h-32 py-2 text-gray-800"
            style={{ resize: "none" }}
          />

          <Button
            type="submit"
            disabled={!input.trim() || isStreaming}
            className={`rounded-full p-3 ml-2 transition-all duration-300 ${
              input.trim()
                ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            <Send className="h-5 w-5" />
          </Button>

          {isStreaming && (
            <button onClick={handleAbort} style={{ marginLeft: "8px" }}>
              중단
            </button>
          )}
        </div>
      </form>
    </Suspense>
  );
};

export default ChatSSE;
