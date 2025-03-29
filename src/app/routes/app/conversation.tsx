// UI 컴포넌트 및 아이콘 import
import ConversationLayout from "@/components/layout/conversation-layout";
import ConvInputForm from "@/domains/conversation/components/Conv-Input-Form";
import ConvMessageList from "@/domains/conversation/components/Conv-Message-List";
import { Suspense } from "react";

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
      <Suspense fallback={<div>Loading...</div>}>
        <ConvMessageList convId={conversationId as string} />

        <ConvInputForm convId={conversationId as string} />
      </Suspense>
    </ConversationLayout>
  );
};

export default ConversationRoute;
