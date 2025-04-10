import { Suspense, useEffect } from 'react';
import { SessionInfoPanel } from '@/domains/conversation/components/session-info-panel.tsx';
import { FeedbackPanel } from '@/domains/conversation/components/feedback-panel.tsx';
import { ConversationMessageList } from '@/domains/conversation/components/conversation-messge-list.tsx';
import { ConversationInputForm } from '@/domains/conversation/components/conversation-input-form.tsx';
import { useParams } from 'react-router-dom';
import { usePlayVoiceStore } from '@/domains/conversation/store/use-play-voice-store.ts';
import ConversationLayout from '@/components/layout/conversation-layout';
import ConversationMainHeader from '@/domains/conversation/components/conversation-main-header';
import useGetConversationInfo from '@/domains/conversation/api/get-conversation-info';

// UPDATED: Main Chat Page Component
const ConversationRoute = () => {
  const { conversationId } = useParams();

  const { data: conversationInfo } = useGetConversationInfo(
    conversationId as string
  );

  const initializeVoices = usePlayVoiceStore((state) => state.initializeVoices);
  const isInitialized = usePlayVoiceStore((state) => state.isInitialized);

  const situationInfo = conversationInfo?.situation; // Hold situationInfo data

  useEffect(() => {
    if (!isInitialized) {
      initializeVoices();
    }
  }, [initializeVoices, isInitialized]);

  return (
    <ConversationLayout>
      <ConversationMainHeader
        convId={conversationId as string}
        title={conversationInfo?.title as string}
        backUrl="/app/dashboard/conversations"
        level={conversationInfo?.level as string}
      />
      {/* Main Content Area */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Chat Area */}
        <main className="mx-auto flex flex-1 flex-col overflow-hidden bg-transparent transition-all duration-300 ease-in-out lg:max-w-4xl">
          {/* Let main area handle width */}
          <Suspense fallback={<div>Loading...</div>}>
            <ConversationMessageList
              userRole={situationInfo?.userRole as string}
              aiRole={situationInfo?.aiRole as string}
            />
          </Suspense>
          {/* Input Area */}
          <div className="shadow-up sticky bottom-0 z-10 border-t border-gray-200/80 bg-white/90 p-3 backdrop-blur-md">
            <ConversationInputForm />
          </div>
        </main>
        {/* Feedback Panel (Absolute positioning on mobile, relative on desktop) */}

        <FeedbackPanel />

        {/* Session Info Panel (New) */}
        <SessionInfoPanel
          situationInfo={situationInfo!}
          level={conversationInfo?.level}
          requests={conversationInfo?.requests}
        />
      </div>
    </ConversationLayout>
  );
};

export default ConversationRoute;
