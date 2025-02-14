// UI 컴포넌트 및 아이콘 import
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ReceiveMsgBox, SendMsgBox } from "@/features/chat/components/MsgBox";
import useChatScroll from "@/features/chat/hooks/use-chat-scroll";
import { TChatMsg } from "@/features/chat/types/types";
import { Send } from "lucide-react";

// React 훅 import
import { MutableRefObject, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// 채팅 페이지 컴포넌트
const ChatRoute = () => {
  // URL 파라미터에서 chatId 추출

  const navigate = useNavigate();
  // const { chatId } = useParams(); // TODO: 채팅방 ID 추후 구현시 사용

  // 메시지 입력 상태 관리
  const [sendMsg, setSendMsg] = useState("");

  // ! ReceiveMsg, SendMsg 임시로 구현
  const [allMsg, setAllMsg] = useState<TChatMsg[]>([]);
  const chatContainerRef = useChatScroll([allMsg]); // 의존성 배열 추가

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
  console.log(allMsg);

  return (
    <div className="flex h-screen flex-col bg-white border border-gray-200 rounded-lg p-4">
      {/* 채팅 헤더 */}
      <header className="flex items-center bg-orange-400 text-white px-4 py-3 rounded-t-lg mb-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-orange-700 rounded-lg transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="text-xl font-semibold ml-4">채팅 페이지</h1>
      </header>

      {/* 메시지 표시 영역 */}
      <div
        id="Msg Area"
        className="flex-1  overflow-y-auto space-y-2 mb-4"
        ref={chatContainerRef}
      >
        {allMsg.map((elem, idx) => {
          if (elem.role === "AI") {
            return <ReceiveMsgBox key={idx} text={elem.msg} />;
          } else {
            return <SendMsgBox key={idx} text={elem.msg} />;
          }
        })}
      </div>

      {/* 메시지 입력 영역 */}
      <form
        id="Input Area"
        className="flex mt-4 flex-shrink-0 space-x-4"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Textarea
          value={sendMsg}
          onChange={(e) => {
            setSendMsg(e.target.value);
            console.log(e.target);
            if (!textAreaRef) adjustTextareaHeight(textAreaRef);
          }}
          placeholder="메시지를 입력하세요"
          onCompositionStart={() => setIsComposing(true)} // 추가된 부분
          onCompositionEnd={() => setIsComposing(false)} // 추가된 부분
          onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter" && !e.shiftKey && !isComposing) {
              e.preventDefault(); // 기본 Enter 동작 방지 (줄바꿈 방지)
              handleSubmit(); // 메시지 전송
            }
          }}
          ref={textAreaRef}
          style={{ resize: "none" }}
        />

        {/* 메시지 전송 버튼 (메시지가 있을 때만 활성화) */}
        <Button type="submit" disabled={!sendMsg}>
          <Send />
        </Button>
      </form>
    </div>
  );
};

export default ChatRoute;
