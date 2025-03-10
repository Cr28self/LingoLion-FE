// UI 컴포넌트 및 아이콘 import
import ConversationLayout from "@/components/layout/conversation-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ReceiveMsgBox,
  SendMsgBox,
} from "@/domains/conversation/components/MsgBox";
import useConversationScroll from "@/domains/conversation/hooks/use-conversation-scroll";
import { TConvMsg } from "@/domains/conversation/types/types";
import { Send } from "lucide-react";

// React 훅 import
import { MutableRefObject, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// 채팅 페이지 컴포넌트
const ConversationRoute = () => {
  // URL 파라미터에서 chatId 추출

  // const { conversationId } = useParams(); // TODO: 채팅방 ID 추후 구현시 사용

  // 메시지 입력 상태 관리
  const [sendMsg, setSendMsg] = useState("");

  // ! ReceiveMsg, SendMsg 임시로 구현
  const [allMsg, setAllMsg] = useState<TConvMsg[]>([]);
  const convContainerRef = useConversationScroll([allMsg]); // 의존성 배열 추가

  const [isComposing, setIsComposing] = useState(false); // 추가된 부분

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustTextareaHeight = (
    textarea: MutableRefObject<HTMLTextAreaElement>
  ) => {
    textarea.current.style.height = "auto"; // 높이를 초기화
    textarea.current.style.height = `${textarea.current.scrollHeight}px`; // 스크롤 높이에 맞춰 높이 조정
  };

  const handleSubmit = () => {
    if (!sendMsg.trim()) return;

    setAllMsg((prev) => [
      ...prev,
      {
        id: Math.random(),
        role: "USER",
        msg: sendMsg,
        createdAt: new Date(),
      },
      {
        id: Math.random(),
        role: "AI",
        msg: "안녕하세요 무엇을 도와드릴까요?",
        createdAt: new Date(),
      },
    ]);

    setSendMsg("");
  };

  return (
    <ConversationLayout>
      {/* 메시지 표시 영역 */}
      <div
        id="Msg Area"
        className="flex-1 overflow-y-auto space-y-6 p-6 bg-[url('/chat-bg-pattern.png')] bg-opacity-5"
        ref={convContainerRef}
      >
        {allMsg.length === 0 ? (
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
          allMsg.map((elem, idx) => {
            if (elem.role === "AI") {
              return <ReceiveMsgBox key={idx} text={elem.msg} />;
            } else {
              return <SendMsgBox key={idx} text={elem.msg} />;
            }
          })
        )}
      </div>

      {/* 메시지 입력 영역 */}
      <form
        id="Input Area"
        className="flex p-4 bg-white border-t border-gray-200 shadow-inner"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="flex items-center w-full bg-gray-100 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-orange-300 focus-within:bg-white transition-all duration-300">
          <Textarea
            value={sendMsg}
            onChange={(e) => {
              setSendMsg(e.target.value);
              if (textAreaRef.current) adjustTextareaHeight(textAreaRef);
            }}
            placeholder="메시지를 입력하세요..."
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
              if (e.key === "Enter" && !e.shiftKey && !isComposing) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            ref={textAreaRef}
            className="flex-1 bg-transparent border-0 focus:ring-0 focus:outline-none focus-visible:outline-none focus-visible:ring-0 resize-none max-h-32 py-2 text-gray-800"
            style={{ resize: "none" }}
          />

          <Button
            type="submit"
            disabled={!sendMsg.trim()}
            className={`rounded-full p-3 ml-2 transition-all duration-300 ${
              sendMsg.trim()
                ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>

      {/* <MessageList /> */}
      {/* <MessageInputForm /> */}
      {/* <Sidebar /> */}
    </ConversationLayout>
  );
};

export default ConversationRoute;
