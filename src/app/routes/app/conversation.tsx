// UI 컴포넌트 및 아이콘 import
import ConversationLayout from "@/components/layout/conversation-layout";

import MessageInputForm from "@/domains/conversation/components/MessageInputForm";
import MessageList from "@/domains/conversation/components/MessageList";

import { useParams } from "react-router-dom";

// 채팅 페이지 컴포넌트
const ConversationRoute = () => {
  // URL 파라미터에서 chatId 추출

  const { conversationId, conversationTitle } = useParams();

  return (
    <ConversationLayout
      title={decodeURIComponent(
        decodeURIComponent(conversationTitle as string)
      )}
    >
      {/* 메시지 표시 영역 */}
      <MessageList convId={conversationId as string} />

      <MessageInputForm convId={conversationId as string} />

      {/* <MessageList /> */}
      {/* <MessageInputForm /> */}
      {/* <Sidebar /> */}
    </ConversationLayout>
  );
};

export default ConversationRoute;
