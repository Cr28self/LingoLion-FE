import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import React, { MutableRefObject, useRef, useState } from "react";
import { useSendMessage } from "../api/send-message";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

type MessageInputFormProps = {
  convId: string;
};
const MessageInputForm = ({ convId }: MessageInputFormProps) => {
  // 메시지 입력 상태 관리
  const [sendMsg, setSendMsg] = useState("");
  const [isComposing, setIsComposing] = useState(false); // 추가된 부분

  const { mutate } = useSendMessage();

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const queryClient = useQueryClient();

  const adjustTextareaHeight = (
    textarea: MutableRefObject<HTMLTextAreaElement>
  ) => {
    textarea.current.style.height = "auto"; // 높이를 초기화
    textarea.current.style.height = `${textarea.current.scrollHeight}px`; // 스크롤 높이에 맞춰 높이 조정
  };

  const handleSubmit = () => {
    if (!sendMsg.trim()) return;

    mutate(
      { convId, content: sendMsg },

      {
        onSuccess: () => {
          // toast.success("메시지 성공");
        },
        onError: (error) => {
          toast.error("메시지 전송 중 오류가 발생했습니다.");
        },
        onSettled: () => {
          console.log("set");
          queryClient.invalidateQueries({
            queryKey: ["getAllMessage", convId],
          });
        },
      }
    );

    setSendMsg("");
  };

  return (
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
  );
};

export default MessageInputForm;
