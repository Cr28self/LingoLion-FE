import { useState, Suspense, useEffect } from 'react';

import { cn } from '@/lib/utils.ts'; // Assuming you have this utility
import { SessionInfoPanel } from '@/domains/conversation/components/session-info-panel.tsx';
import { FeedbackPanel } from '@/domains/conversation/components/feedback-panel.tsx';

import { SettingDialog } from '@/domains/conversation/components/setting-dialog.tsx';
import { ConversationMessageList } from '@/domains/conversation/components/conversation-messge-list.tsx';
import { ConversationInputForm } from '@/domains/conversation/components/conversation-input-form.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useLiveMessagesStore } from '@/domains/conversation/store/use-live-messages-store.ts';
import { usePlayVoiceStore } from '@/domains/conversation/store/use-play-voice-store.ts';
import ConversationLayout from '@/components/layout/conversation-layout';
import { ChevronsLeft, Info, MoreVertical, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

// UPDATED: Main Chat Page Component
const ConversationRoute = () => {
  const { conversationId, conversationTitle } = useParams();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const resetLiveMessages = useLiveMessagesStore(
    (state) => state.resetLiveMessages
  );

  const handleExitConversation = () => {
    navigate('/app/dashboard/conversations');
    resetLiveMessages();

    queryClient.invalidateQueries({
      queryKey: ['getAllMessage', conversationId],
    });
  };

  const initializeVoices = usePlayVoiceStore((state) => state.initializeVoices);
  const isInitialized = usePlayVoiceStore((state) => state.isInitialized);

  useEffect(() => {
    if (!isInitialized) {
      initializeVoices();
    }
  }, [initializeVoices, isInitialized]);

  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);

  const [isFeedbackPanelOpen, setIsFeedbackPanelOpen] = useState(false); // Default closed
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false); // State for Session Info Panel
  const [isSettingDialogOpen, setIsSettingDialogOpen] = useState(false); // State for Settings Dialog
  const [menuOpen, setMenuOpen] = useState(false); // State for Dropdown Menu

  const handleToggleInfoPanel = () => {
    setIsInfoPanelOpen(!isInfoPanelOpen);
    if (!isInfoPanelOpen) {
      // If opening info panel, close feedback panel
      setIsFeedbackPanelOpen(false);
      setSelectedFeedbackId(null);
    }
  };

  const handleToggleFeedbackPanel = () => {
    setIsFeedbackPanelOpen(!isFeedbackPanelOpen);
    if (!isFeedbackPanelOpen) {
      // If opening feedback panel, close info panel
      setIsInfoPanelOpen(false);
    }
    // Reset selection when closing feedback panel from header toggle
    if (isFeedbackPanelOpen) {
      setSelectedFeedbackId(null);
    }
  };

  const handleOpenDialog = () => {
    setMenuOpen(false); // 메뉴 먼저 닫고
    setTimeout(() => {
      setIsSettingDialogOpen(true); // 잠깐 기다렸다가 다이얼로그 열기
    }, 50);
  };

  const handleSelectMessageFromSidebar = (feedbackId) => {
    setSelectedFeedbackId(feedbackId);
  };

  return (
    <ConversationLayout
      title={decodeURIComponent(
        decodeURIComponent(conversationTitle as string)
      )}
      onExitConversation={handleExitConversation}
      buttons={
        <>
          <button
            onClick={handleToggleInfoPanel}
            className="rounded-full p-1.5 transition-colors hover:bg-white/20"
            aria-label="Show session info"
          >
            <Info size={20} />
          </button>

          <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full p-1.5 transition-colors hover:bg-white/20">
                <MoreVertical size={20} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>메뉴</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleOpenDialog}>
                <Settings size={16} className="mr-1" /> 채팅방 설정
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Feedback Toggle Button */}
          <button
            onClick={handleToggleFeedbackPanel}
            className="hidden rounded-full p-1.5 transition-colors hover:bg-white/20 md:block"
            aria-label={
              isFeedbackPanelOpen
                ? 'Hide Feedback Panel'
                : 'Show Feedback Panel'
            }
          >
            {isFeedbackPanelOpen ? (
              <ChevronsLeft size={20} />
            ) : (
              <ChevronsLeft size={20} />
            )}
          </button>
        </>
      }
    >
      {/* Main Content Area */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Chat Area */}
        <main className="mx-auto flex flex-1 flex-col overflow-hidden bg-transparent transition-all duration-300 ease-in-out lg:max-w-4xl">
          {' '}
          {/* Let main area handle width */}
          <Suspense fallback={<div>Loading...</div>}>
            <ConversationMessageList />
          </Suspense>
          {/* Input Area */}
          <div className="shadow-up sticky bottom-0 z-10 border-t border-gray-200/80 bg-white/90 p-3 backdrop-blur-md">
            <ConversationInputForm />
          </div>
        </main>
        {/* Feedback Panel (Absolute positioning on mobile, relative on desktop) */}
        <aside
          className={cn(
            'absolute inset-y-0 right-0 z-20 w-full transform border-l border-gray-200/50 bg-white transition-transform duration-300 ease-in-out', // Added bg-white for overlay effect
            isFeedbackPanelOpen
              ? 'translate-x-0 md:relative md:z-auto md:w-1/3 lg:w-2/5 xl:w-1/3'
              : 'translate-x-full'
          )}
        >
          <FeedbackPanel
            selectedFeedbackId={selectedFeedbackId}
            onSelectMessage={handleSelectMessageFromSidebar}
            onClose={handleToggleFeedbackPanel} // Use toggle to handle close
          />
        </aside>
        {/* Session Info Panel (New) */}
        <SessionInfoPanel
          isOpen={isInfoPanelOpen}
          onClose={handleToggleInfoPanel}
        />
        {
          // Settings Dialog
          isSettingDialogOpen && (
            <SettingDialog
              isOpen={isSettingDialogOpen}
              onOpenChange={setIsSettingDialogOpen}
            />
          )
        }
        {/* Overlay for closing panels when clicking outside (optional) */}
        {(isInfoPanelOpen || isFeedbackPanelOpen) && (
          <div
            className="fixed inset-0 z-10 bg-black/10 md:hidden" // Only on mobile/tablet
            onClick={() => {
              setIsInfoPanelOpen(false);
              setIsFeedbackPanelOpen(false);
              setSelectedFeedbackId(null); // Reset selection when closing via overlay
            }}
            aria-hidden="true"
          />
        )}
      </div>
    </ConversationLayout>
  );
};

export default ConversationRoute;
