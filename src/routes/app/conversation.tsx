// UI 컴포넌트 및 아이콘 import
import ConversationLayout from "@/components/layout/conversation-layout";
import ConversationInputForm from "@/domains/conversation/components/conversation-input-form.tsx";
import ConversationMessageList from "@/domains/conversation/components/conversation-message-list.tsx";
import { useLiveMessagesStore } from "@/domains/conversation/store/use-live-messages-store";
import { useQueryClient } from "@tanstack/react-query";
import {Suspense, useEffect} from "react";

import { useNavigate, useParams } from "react-router-dom";
import {usePlayVoiceStore} from "@/domains/conversation/store/use-play-voice-store.ts";

// 채팅 페이지 컴포넌트
const ConversationRoute = () => {
  // URL 파라미터에서 chatId 추출

  const { conversationId, conversationTitle } = useParams();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const resetLiveMessages = useLiveMessagesStore(
    (state) => state.resetLiveMessages
  );

  const handleExitConversation = () => {
    navigate("/app/dashboard/conversations");
    resetLiveMessages();

    queryClient.invalidateQueries({
      queryKey: ["getAllMessage", conversationId],
    });
  };


  const initializeVoices = usePlayVoiceStore((state) => state.initializeVoices);
  const isInitialized = usePlayVoiceStore((state) => state.isInitialized);
  const cleanupVoiceStore = usePlayVoiceStore(state => state.cleanup);


  useEffect(()=>{

    if(!isInitialized){
      initializeVoices();
    }

    // 언마운트 시 cleanup 함수 반환
    return () => {
      console.log("App component unmounting. Triggering voice store cleanup.");
      // 스토어의 cleanup 액션 호출
      cleanupVoiceStore();
    };
  },[initializeVoices,isInitialized,cleanupVoiceStore])

  return (
    <ConversationLayout
      title={decodeURIComponent(
        decodeURIComponent(conversationTitle as string)
      )}
      onExitConversation={handleExitConversation}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <ConversationMessageList convId={conversationId as string} />

        <ConversationInputForm convId={conversationId as string} />
      </Suspense>

    </ConversationLayout>
  );
};

export default ConversationRoute;
