import { useState, useMemo, Suspense, useEffect } from 'react';
import {
  ArrowLeft,
  MoreVertical,
  ChevronsRight,
  ChevronsLeft,
  Info,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming you have this utility
import { SessionInfoPanel } from '@/domains/conversation/components/session-info-panel.tsx';
import { FeedbackPanel } from '@/domains/conversation/components/feedback-panel.tsx';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { SettingDialog } from '@/domains/conversation/components/setting-dialog.tsx';
import { ConversationMessageList } from '@/domains/conversation/components/conversation-messge-list.tsx';
import { ConversationInputForm } from '@/domains/conversation/components/conversation-input-form.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useLiveMessagesStore } from '@/domains/conversation/store/use-live-messages-store.ts';
import { usePlayVoiceStore } from '@/domains/conversation/store/use-play-voice-store.ts';

// --- Mock Data (Same as before) ---
const initialMessages = [
  {
    id: 1,
    sender: 'ai',
    name: '링고 (Barista)',
    avatar:
      'https://source.unsplash.com/random/150x150/?coffee-shop-logo,barista',
    text: 'Welcome to our coffee shop! What can I get for you today?',
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
  },
  {
    id: 2,
    sender: 'user',
    name: '나',
    text: "Hi! I'm looking for a recommendation. I usually enjoy black coffee.",
    timestamp: new Date(Date.now() - 9 * 60 * 1000),
    hasFeedback: true,
    feedbackId: 'fb1',
  },
  {
    id: 3,
    sender: 'ai',
    name: '링고 (Barista)',
    avatar:
      'https://source.unsplash.com/random/150x150/?coffee-shop-logo,barista',
    text: "That's great! If you enjoy black coffee, I recommend our single-origin pour-over—it's rich and flavorful.",
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
  },
  {
    id: 4,
    sender: 'user',
    name: '나',
    text: 'oh really?',
    timestamp: new Date(Date.now() - 7 * 60 * 1000),
    hasFeedback: true,
    feedbackId: 'fb2',
  },
  {
    id: 5,
    sender: 'ai',
    name: '링고 (Barista)',
    avatar:
      'https://source.unsplash.com/random/150x150/?coffee-shop-logo,barista',
    text: 'Yes! Can I help you with something specific about our coffee menu or perhaps the pour-over?',
    timestamp: new Date(Date.now() - 6 * 60 * 1000),
  },
  {
    id: 6,
    sender: 'user',
    name: '나',
    text: 'I wanna hot coffee',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    hasFeedback: true,
    feedbackId: 'fb3',
  },
  {
    id: 7,
    sender: 'ai',
    name: '링고 (Barista)',
    avatar:
      'https://source.unsplash.com/random/150x150/?coffee-shop-logo,barista',
    text: 'Sure! What kind of hot coffee are you in the mood for—espresso, cappuccino, or maybe a latte?',
    timestamp: new Date(Date.now() - 4 * 60 * 1000),
  },
  {
    id: 8,
    sender: 'user',
    name: '나',
    text: 'I wanna hot latte',
    timestamp: new Date(Date.now() - 3 * 60 * 1000),
    hasFeedback: true,
    feedbackId: 'fb4',
  },
  {
    id: 9,
    sender: 'ai',
    name: '링고 (Barista)',
    avatar:
      'https://source.unsplash.com/random/150x150/?coffee-shop-logo,barista',
    text: 'Excellent choice! Would you like it with any flavor, like vanilla or caramel?',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
  },
];

const initialFeedback = {
  fb1: {
    id: 'fb1',
    originalMessage:
      "Hi! I'm looking for a recommendation. I usually enjoy black coffee.",
    feedbackItems: [
      {
        type: 'expression',
        severity: 'info',
        text: 'Good opening! Clear and polite.',
        suggestion: null,
      },
      {
        type: 'grammar',
        severity: 'info',
        text: "'I usually enjoy' is perfectly fine.",
        suggestion:
          "Alternatively: 'I'm a fan of black coffee.' or 'Black coffee is my usual go-to.'",
      },
    ],
  },
  fb2: {
    id: 'fb2',
    originalMessage: 'oh really?',
    feedbackItems: [
      {
        type: 'grammar',
        severity: 'warning',
        text: "While common in speech, starting a sentence with 'oh' and not capitalizing 'Oh' is informal. Missing punctuation.",
        suggestion: "'Oh, really?'",
      },
      {
        type: 'expression',
        severity: 'info',
        text: "Shows engagement. You could also say: 'Is that so?' or 'Interesting!'",
        suggestion: null,
      },
    ],
  },
  fb3: {
    id: 'fb3',
    originalMessage: 'I wanna hot coffee',
    feedbackItems: [
      {
        type: 'grammar',
        severity: 'error',
        text: "'wanna' is very informal slang for 'want to'. It's better to use 'want a' or 'would like a' in this context.",
        suggestion:
          "'I want a hot coffee.' or 'I'd like a hot coffee, please.'",
      },
      {
        type: 'expression',
        severity: 'info',
        text: "Clearly states your desire. Using 'please' makes it more polite.",
        suggestion: null,
      },
    ],
  },
  fb4: {
    id: 'fb4',
    originalMessage: 'I wanna hot latte',
    feedbackItems: [
      {
        type: 'grammar',
        severity: 'error',
        text: "Similar to the previous message, 'wanna' is informal. Use 'want a' or 'would like a'.",
        suggestion: "'I want a hot latte.' or 'I'd like a hot latte.'",
      },
      {
        type: 'expression',
        severity: 'info',
        text: 'Direct and understandable.',
        suggestion: null,
      },
    ],
  },
};
// --- Mock Context Data (추가) ---
const mockSessionContext = {
  title: 'Coffee Shop Order Practice',
  difficulty: 'Intermediate', // or maybe numerical 1-5
  requests:
    'Speak naturally, like a real barista. Be friendly but professional.',
  place: 'A busy downtown coffee shop',
  aiRole: 'Experienced Barista named Ringo',
  userRole: 'Customer trying to order a specific drink',
  goal: 'Successfully order a customized latte and ask about loyalty programs.',
};

// --- Components ---

// UPDATED: Main Chat Page Component
const ConversationRoute = () => {
  // URL 파라미터에서 chatId 추출

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

  const title = decodeURIComponent(
    decodeURIComponent(conversationTitle as string)
  );

  const [messages, setMessages] = useState(initialMessages);
  const [feedbackData, setFeedbackData] = useState(initialFeedback);

  const [isFeedbackPanelOpen, setIsFeedbackPanelOpen] = useState(false); // Default closed
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);

  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false); // State for Session Info Panel
  const [sessionContext, setSessionContext] = useState(mockSessionContext); // Hold context data
  const [isSettingDialogOpen, setIsSettingDialogOpen] = useState(false); // State for Settings Dialog
  const [menuOpen, setMenuOpen] = useState(false); // State for Dropdown Menu

  const userMessagesWithFeedback = useMemo(
    () => messages.filter((msg) => msg.sender === 'user' && msg.hasFeedback),
    [messages]
  );

  const handleSelectMessageFromSidebar = (feedbackId) => {
    setSelectedFeedbackId(feedbackId);
  };

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

  return (
    <div className="flex h-screen flex-col overflow-hidden font-sans">
      {/* Added overflow-hidden */}
      <header className="sticky top-0 z-20 flex flex-shrink-0 items-center justify-between bg-gray-50 p-3 shadow-lg">
        <div className="flex min-w-0 items-center space-x-2">
          {/* Added min-w-0 for truncation */}
          <button className="flex-shrink-0 rounded-full p-1.5 transition-colors hover:bg-white/20">
            <ArrowLeft size={20} />
          </button>
          <div className="flex min-w-0 flex-col items-start md:flex-row md:items-center">
            {/* Wrapper for truncation */}
            <h1 className="truncate text-lg font-semibold">여기는 타이틀</h1>
            {/* Added truncate */}
            <Badge className="md:ml-2" variant="default">
              Lv. Intermediate
            </Badge>
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center space-x-1">
          {/* Info Button */}
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
              <ChevronsRight size={20} />
            ) : (
              <ChevronsLeft size={20} />
            )}
          </button>
        </div>
      </header>
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
            feedbackData={feedbackData}
            userMessagesWithFeedback={userMessagesWithFeedback}
            selectedFeedbackId={selectedFeedbackId}
            onSelectMessage={handleSelectMessageFromSidebar}
            onClose={handleToggleFeedbackPanel} // Use toggle to handle close
          />
        </aside>
        {/* Session Info Panel (New) */}
        <SessionInfoPanel
          context={sessionContext}
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
    </div>
  );
};

export default ConversationRoute;
