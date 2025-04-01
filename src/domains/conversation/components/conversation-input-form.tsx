import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import React, { MutableRefObject, useRef, useState } from "react";
import { useConvInputStore } from "../store/use-conv-input-store";
import { useSendSSEMessage } from "../api/send-sse-message";

export default function ConversationInputForm({ convId }: { convId: string }) {
  const { inputMessage, setInputMessage } = useConvInputStore();
  const [isComposing, setIsComposing] = useState(false); // 추가된 부분

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleAbort = () => {};

  const { handleSend, isStreaming } = useSendSSEMessage(convId);

  const adjustTextareaHeight = (
    textarea: MutableRefObject<HTMLTextAreaElement>
  ) => {
    textarea.current.style.height = "auto"; // 높이를 초기화
    textarea.current.style.height = `${textarea.current.scrollHeight}px`; // 스크롤 높이에 맞춰 높이 조정
  };

  return (
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
          value={inputMessage}
          onChange={(e) => {
            setInputMessage(e.target.value);
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
          disabled={!inputMessage.trim() || isStreaming}
          className={`rounded-full p-3 ml-2 transition-all duration-300 ${
            inputMessage.trim()
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
  );
}
