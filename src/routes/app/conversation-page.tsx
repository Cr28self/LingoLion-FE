import { Suspense, useEffect } from 'react';
import { SessionInfoPanel } from '@/features/conversation-session/components/session-info-panel.tsx';
import { FeedbackPanel } from '@/features/conversation-session/components/feedback-panel.tsx';
import { ConversationMessageList } from '@/features/conversation-session/components/conversation-messge-list.tsx';
import { ConversationInputForm } from '@/features/conversation-session/components/conversation-input-form.tsx';
import { useParams } from 'react-router-dom';
import { usePlayVoiceStore } from '@/features/conversation-session/store/use-play-voice-store.ts';
import ConversationLayout from '@/app/layouts/conversation-layout';
import ConversationMainHeader from '@/features/conversation-session/components/conversation-main-header';
import useGetConversationInfo from '@/features/conversation-session/api/get-conversation-info';
import { SkeletonChatConv } from '@/features/conversation-session/components/conversation-skeleton-loading';

// UPDATED: Main Chat Page Component
const ConversationPage = () => {
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
        backUrl="/app/my-conversations"
        level={conversationInfo?.level as string}
      />
      {/* Main Content Area */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Chat Area */}
        <main className="mx-auto flex flex-1 flex-col overflow-hidden rounded-xl bg-transparent transition-all duration-300 ease-in-out dark:bg-gray-700/80 lg:max-w-4xl">
          {/* Let main area handle width */}
          <Suspense fallback={<SkeletonChatConv />}>
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

        <Suspense fallback={<div>FeedbackPanelLoading...</div>}>
          <FeedbackPanel />
        </Suspense>

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

export default ConversationPage;
