import { useAuthStore } from "@/lib/auth/useAuthStore";
import { useRef, useState } from "react";

type LiveMessages = {
  role: "assistant" | "user";
  content: string;
  order: number;
};
export const useSendSSEMessage = (convId: string) => {
  const { getAccessToken } = useAuthStore();
  // 사용자의 입력 메시지
  const [input, setInput] = useState("");
  // 서버로부터 수신한 메시지(실시간 표시)
  const [liveMessages, setLiveMessages] = useState<LiveMessages[]>([]);

  // 스트림 연결 중 여부 (UI 제어용)
  const [isStreaming, setIsStreaming] = useState(false);
  const orderRef = useRef(0); // 메시지 순서 관리용
  const handleSend = async () => {
    if (!input.trim()) return;

    // 기존 대화 내용 + 새 전송 내용 세팅
    setLiveMessages([
      ...liveMessages,
      { role: "user", content: input, order: orderRef.current++ },
    ]);

    setIsStreaming(true);

    setInput("");

    try {
      const response = await fetch(
        `/api/conversations/${convId}/message/stream`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream", // SSE 응답을 받을 것임
            Authorization: `Bearer ${getAccessToken()}`, // 인증 토큰
          },
          body: JSON.stringify({
            role: "user",
            content: input,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`서버 에러: ${response.status}`);
      }

      // 스트림 읽기 준비
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let done = false;
      let buffer = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        if (value) {
          // chunk를 문자열로 변환
          const chunkText = decoder.decode(value, { stream: !doneReading });
          buffer += chunkText;

          // SSE 포맷: 각 메시지 블록은 "data: ..." 형태 + "\n\n" 구분
          // 라인 단위로 쪼개어 "data: "가 들어있는지 확인
          let lines = buffer.split("\n");

          for (let i = 0; i < lines.length - 1; i++) {
            const line = lines[i].trim();

            if (line.startsWith("data: ")) {
              const jsonStr = line.replace(/^data:\s*/, "");

              if (jsonStr === "[DONE]") {
                // 백엔드에서 전송 완료 신호를 [DONE] 같은 식으로 줄 수도 있음
                // 필요 시 처리
                continue;
              }

              try {
                const parsedMessage = JSON.parse(jsonStr);

                // 여기서는 "content" 필드를 이어붙인다고 가정
                if (parsedMessage.content) {
                  setLiveMessages((prevMessages) => {
                    const lastMessage = prevMessages[prevMessages.length - 1];

                    // 데이터 추가중....
                    if (lastMessage?.role === "assistant") {
                      const updatedMessage = [...prevMessages];
                      updatedMessage[updatedMessage.length - 1] = {
                        ...lastMessage,
                        content: lastMessage.content + parsedMessage.content,
                      };

                      return updatedMessage;
                    }

                    // 최초 데이터 들어올때...
                    return [
                      ...prevMessages,
                      {
                        role: "assistant",
                        content: parsedMessage.content,
                        order: orderRef.current++,
                      },
                    ];
                  });
                }
              } catch (err) {
                // JSON 파싱이 안 되면, 일반 텍스트라고 가정하고 그대로 붙임
                setLiveMessages([
                  ...liveMessages,
                  {
                    role: "assistant",
                    content: jsonStr,
                    order: orderRef.current++,
                  },
                ]);
              }
            }
          }
          // 마지막 줄은 아직 완전히 읽지 못한 덩어리일 수 있으니 buffer에 남겨둠
          buffer = lines[lines.length - 1];
        }
      }
    } catch (error) {
      console.error("스트림 도중 에러 발생:", error);
    } finally {
      setIsStreaming(false);
    }
  };

  return {
    handleSend,
    input,
    setInput,
    liveMessages,
    isStreaming,
    setLiveMessages,
    setIsStreaming,
  };
};
