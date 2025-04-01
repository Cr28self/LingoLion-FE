// UI 컴포넌트 및 아이콘 import
import ConversationLayout from "@/components/layout/conversation-layout";
import ConversationInputForm from "@/domains/conversation/components/conversation-input-form.tsx";
import ConversationMessageList from "@/domains/conversation/components/conversation-message-list.tsx";
import { Suspense } from "react";

import { useParams } from "react-router-dom";

// 채팅 페이지 컴포넌트
const ConversationRoute = () => {
  // URL 파라미터에서 chatId 추출

  const { conversationId, conversationTitle } = useParams();

  return (
    <ConversationLayout
      convId={conversationId as string}
      title={decodeURIComponent(
        decodeURIComponent(conversationTitle as string)
      )}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <ConversationMessageList convId={conversationId as string} />

        <ConversationInputForm convId={conversationId as string} />
      </Suspense>
    </ConversationLayout>
  );
};

export default ConversationRoute;
