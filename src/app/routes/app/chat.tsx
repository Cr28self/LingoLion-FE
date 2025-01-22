// UI 컴포넌트 및 아이콘 import
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReceiveMsgBox, SendMsgBox } from "@/features/chat/components/MsgBox";
import { Send } from "lucide-react";

// React 훅 import
import { useState } from "react";
import { useParams } from "react-router-dom";

// 채팅 페이지 컴포넌트
const ChatRoute = () => {
  // URL 파라미터에서 chatId 추출

  // ReactRouter에서 loader 사용해서 react-query 캐시에 저장 vs loader 사용 안하고 바로 react-query에서 모든걸 다 하기
  const { chatId } = useParams();

  // 메시지 입력 상태 관리
  const [sendMsg, setSendMsg] = useState("");

  return (
    <div className="flex min-h-screen flex-col bg-white border border-gray-200 rounded-lg p-4">
      {/* 현재 채팅방 ID 표시 */}
      {chatId}

      {/* 메시지 표시 영역 */}
      <div id="Msg Area">
        {/* 수신 메시지 박스 */}
        <ReceiveMsgBox />

        {/* 발신 메시지 박스 */}
        <SendMsgBox />
      </div>

      {/* 메시지 입력 영역 */}
      <div id="Input Area" className="flex mt-4">
        <Input
          type="text"
          value={sendMsg}
          onChange={(e) => setSendMsg(e.target.value)}
        />
        {/* 메시지 전송 버튼 (메시지가 있을 때만 활성화) */}
        <Button type="submit" disabled={!sendMsg}>
          <Send />
        </Button>
      </div>
    </div>
  );
};

export default ChatRoute;
