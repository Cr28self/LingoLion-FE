// UI 컴포넌트 및 아이콘 import
import ConversationLayout from "@/components/layout/conversation-layout";
import ChatSSE from "@/domains/conversation/components/ChatSSE";

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
      <ChatSSE convId={conversationId as string} />
    </ConversationLayout>
  );
};

export default ConversationRoute;
