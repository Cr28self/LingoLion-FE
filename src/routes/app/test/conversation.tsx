import {
  useState,
  useRef,
  useEffect,
  useMemo,
  Suspense,
  useLayoutEffect,
} from 'react';
import {
  ArrowLeft,
  MoreVertical,
  ChevronsRight,
  ChevronsLeft,
  X,
  Mic,
  Square,
  ArrowUp,
  Info,
  HelpCircle,
  Loader2,
  ListChecks,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming you have this utility
import useInfiniteScroll from '@/hooks/use-infinite-scroll';
import { SessionInfoPanel } from '@/domains/conversation/components/test/session-info-panel';
import { AIMessage } from '@/domains/conversation/components/test/ai-message';
import { UserMessage } from '@/domains/conversation/components/test/user-message';
import { FeedbackPanel } from '@/domains/conversation/components/test/feedback-panel';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { SettingDialog } from '@/domains/conversation/components/test/setting-dialog';
import { useLiveMessagesStore } from '@/domains/conversation/store/use-live-messages-store';
import useGetAllInfiniteMessage from '@/domains/conversation/api/get-all-message';
import ConversationMessageBox from '@/domains/conversation/components/conversation-message-box';
import { useConvScrollManager } from '@/domains/conversation/hooks/use-conv-scroll-manager';

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

const ConversationMessageList = () => {
  const chatEndRef = useRef(null);

  const pageLimit = 7;

  const convId = '18';

  const liveMessages = useLiveMessagesStore((state) => state.liveMessages);

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } =
    useGetAllInfiniteMessage(convId, pageLimit);

  const flatMessages = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) || [];
  }, [data]);

  const { rootRef, targetRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  useConvScrollManager({
    rootRef,
    isFetchingNextPage,
    hasNextPage,
    isFetching,
    messageCount: flatMessages.length,
    pageLimit,
  });

  return (
    <div className="flex-1 space-y-6 overflow-y-auto p-4" ref={rootRef}>
      {/* ... message mapping ... */}

      {/* Loading Indicator at the top */}
      {isFetchingNextPage && (
        <div className="py-2 text-center text-gray-500">
          Loading older messages...
        </div>
      )}

      {/* start of reversedMessages */}
      {flatMessages.length > 0 &&
        flatMessages.map((flatMessage, order, arr) => {
          // Target the second message (index 1) for triggering load of older messages

          const index = arr.length - 1 - order;
          const message = arr[index];

          const isTriggerElement = order === 1;
          const elemKey = `${convId}-${message.id}`; // Ensure unique key

          return (
            <ConversationMessageBox
              key={elemKey}
              message={message}
              // onMessageClick={() => {}}
              // isSelected={false}
              ref={isTriggerElement ? targetRef : null}
            />
          );
        })}

      <div ref={chatEndRef} className="h-11" />
    </div>
  );
};

// UPDATED: Main Chat Page Component
const RoleplayChatPage = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [feedbackData, setFeedbackData] = useState(initialFeedback);
  const [inputValue, setInputValue] = useState('');
  const [isFeedbackPanelOpen, setIsFeedbackPanelOpen] = useState(false); // Default closed
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false); // State for Session Info Panel
  const [sessionContext, setSessionContext] = useState(mockSessionContext); // Hold context data
  const [isSettingDialogOpen, setIsSettingDialogOpen] = useState(false); // State for Settings Dialog
  const [menuOpen, setMenuOpen] = useState(false); // State for Dropdown Menu

  // !Quick Helper
  const [isAskingHelper, setIsAskingHelper] = useState(false);
  const [helperQuestion, setHelperQuestion] = useState('');
  const [helperAnswer, setHelperAnswer] = useState('');
  const [isFetchingHelperAnswer, setIsFetchingHelperAnswer] = useState(false);

  const sendingTimeoutRef = useRef(null);
  const aiResponseTimeoutRef = useRef(null);

  const userMessagesWithFeedback = useMemo(
    () => messages.filter((msg) => msg.sender === 'user' && msg.hasFeedback),
    [messages]
  );

  const handleMessageClick = (feedbackId) => {
    console.log('피드백 아이디', feedbackId);
    setSelectedFeedbackId(feedbackId);
    setIsInfoPanelOpen(false); // Close info panel if open
    if (!isFeedbackPanelOpen) setIsFeedbackPanelOpen(true);
  };

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

  const handleCancelSending = () => {
    if (sendingTimeoutRef.current) {
      clearTimeout(sendingTimeoutRef.current);
      sendingTimeoutRef.current = null;
    }
    if (aiResponseTimeoutRef.current) {
      clearTimeout(aiResponseTimeoutRef.current);
      aiResponseTimeoutRef.current = null;
    }
    // Optionally remove the optimistically added user message or mark it as 'cancelled'
    // For simplicity here, we just stop the process
    setIsSending(false);
    console.log('Sending cancelled');
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '' || isSending) return;

    setIsSending(true);
    const currentInput = inputValue;
    setInputValue('');

    const newUserMessage = {
      id: Date.now(),
      sender: 'user',
      name: '나',
      text: currentInput,
      timestamp: new Date(),
      hasFeedback: Math.random() > 0.3,
      feedbackId: null,
    };
    if (newUserMessage.hasFeedback)
      newUserMessage.feedbackId = `fb${Date.now()}`;

    setMessages((prev) => [...prev, newUserMessage]);

    if (newUserMessage.hasFeedback) {
      setFeedbackData((prev) => ({
        ...prev,
        [newUserMessage.feedbackId]: {
          id: newUserMessage.feedbackId,
          originalMessage: newUserMessage.text,
          feedbackItems: [
            {
              type: 'grammar',
              severity: 'info',
              text: 'Analyzing...',
              suggestion: null,
            },
            {
              type: 'expression',
              severity: 'info',
              text: 'Checking...',
              suggestion: null,
            },
          ],
        },
      }));
    }

    // Clear previous timeouts just in case
    handleCancelSending();

    // Simulate network delay and AI response
    sendingTimeoutRef.current = setTimeout(
      () => {
        // Simulate AI processing
        aiResponseTimeoutRef.current = setTimeout(
          () => {
            const aiResponse = {
              id: Date.now() + 1,
              sender: 'ai',
              name: '링고 (Barista)',
              avatar:
                'https://source.unsplash.com/random/150x150/?coffee-shop-logo,barista',
              text: `Okay, regarding "${currentInput.substring(0, 20)}...", (Simulated AI Response)`,
              timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiResponse]);

            // Simulate feedback refinement
            if (newUserMessage.hasFeedback) {
              setTimeout(() => {
                setFeedbackData((prev) => {
                  const fb = prev[newUserMessage.feedbackId];
                  if (!fb) return prev; // Guard against race conditions if cancelled
                  const updatedFeedback = { ...fb };
                  updatedFeedback.feedbackItems[0].text =
                    'Final grammar check.';
                  updatedFeedback.feedbackItems[1].text =
                    'Final expression analysis.';
                  return {
                    ...prev,
                    [newUserMessage.feedbackId]: updatedFeedback,
                  };
                });
              }, 300);
            }
            setIsSending(false); // Finish sending state
            sendingTimeoutRef.current = null;
            aiResponseTimeoutRef.current = null;
          },
          800 + Math.random() * 1000
        );
      },
      500 + Math.random() * 800
    );
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const handleFetchHelperAnswer = () => {
    // isFetchingHelperAnswer를 true로 설정.
    // helperQuestion을 가지고 AI API 호출 (새로운 엔드포인트 필요).
    // 응답 받으면 helperAnswer 업데이트, isFetchingHelperAnswer를 false로 설정.
    // 에러 처리.
    setIsFetchingHelperAnswer(true);
    setTimeout(() => {
      setHelperAnswer('This is a simulated answer to your question.');
      setIsFetchingHelperAnswer(false);
    }, 2000);
  };

  const handleApplyAnswerToInput = () => {
    setInputValue(helperAnswer);
    setHelperAnswer('');
    setIsAskingHelper(false);
  };

  const handleCloseHelper = () => {
    setHelperQuestion('');
    setHelperAnswer('');
    setIsAskingHelper(false);
    setIsFetchingHelperAnswer(false);
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
      {/* UPDATED Header */}
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
        {' '}
        {/* Added relative for panel positioning */}
        {/* Chat Area */}
        <main className="mx-auto flex flex-1 flex-col overflow-hidden bg-transparent transition-all duration-300 ease-in-out lg:max-w-4xl">
          {' '}
          {/* Let main area handle width */}
          <Suspense fallback={<div>Loading...</div>}>
            <ConversationMessageList />
          </Suspense>
          {/* Input Area */}
          <div className="shadow-up sticky bottom-0 z-10 border-t border-gray-200/80 bg-white/90 p-3 backdrop-blur-md">
            {/* ... input logic (isRecording ? ... : ...) ... */}

            {/* --- 질문 UI 컨테이너 (isAskingHelper가 true일 때 표시) --- */}
            {isAskingHelper && (
              <div className="absolute bottom-full left-0 right-0 z-20 mb-2 px-3">
                {' '}
                {/* 위치 조정 필요 */}
                <div className="animate-slide-down rounded-lg border border-blue-200 bg-blue-50 p-3 shadow-md">
                  {' '}
                  {/* 예시 스타일 및 애니메이션 */}
                  {!helperAnswer && !isFetchingHelperAnswer && (
                    // --- 질문 입력 상태 ---
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={helperQuestion}
                        onChange={(e) => setHelperQuestion(e.target.value)}
                        placeholder="궁금한 표현이나 단어를 물어보세요..."
                        className="flex-grow rounded-md border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        onClick={handleFetchHelperAnswer}
                        disabled={!helperQuestion.trim()}
                        className="rounded-md bg-blue-500 px-3 py-1 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50"
                      >
                        질문
                      </button>
                      <button
                        onClick={handleCloseHelper}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        {' '}
                        <X size={16} />{' '}
                      </button>
                    </div>
                  )}
                  {isFetchingHelperAnswer && (
                    // --- 로딩 상태 ---
                    <div className="flex items-center justify-center text-sm text-gray-600">
                      <Loader2 size={16} className="mr-2 animate-spin" /> 답변을
                      생성 중입니다...
                      <button
                        onClick={handleCloseHelper}
                        className="ml-auto p-1 text-gray-400 hover:text-gray-600"
                      >
                        {' '}
                        <X size={16} />{' '}
                      </button>
                    </div>
                  )}
                  {helperAnswer && !isFetchingHelperAnswer && (
                    // --- 답변 표시 상태 ---
                    <div>
                      <p className="mb-2 text-sm text-gray-800">
                        {helperAnswer}
                      </p>{' '}
                      {/* 실제 답변 표시 */}
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={handleApplyAnswerToInput}
                          className="rounded-md bg-green-500 px-3 py-1 text-sm font-medium text-white hover:bg-green-600"
                        >
                          입력창에 적용
                        </button>
                        <button
                          onClick={handleCloseHelper}
                          className="rounded-md bg-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-300"
                        >
                          닫기
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {isRecording ? (
              // --- Voice Recording UI ---
              <div className="flex h-[66px] items-center justify-center rounded-xl border border-red-200 bg-gradient-to-r from-orange-100 to-red-100 p-4 shadow-inner">
                {/* Optional: Add a visualizer or recording indicator */}
                <span className="mr-4 text-sm text-red-700">Recording...</span>
                <button
                  onClick={handleToggleRecording}
                  className="flex transform items-center justify-center rounded-full bg-red-500 p-3 text-white shadow-lg transition hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                  aria-label="Stop recording"
                >
                  <Square size={20} fill="white" />
                </button>
              </div>
            ) : (
              // --- Text Input UI ---
              <div
                className={cn(
                  'flex items-center rounded-xl border border-gray-300 bg-white px-2 py-1 shadow-sm transition-all focus-within:border-transparent focus-within:ring-2 focus-within:ring-orange-400',
                  isSending ? 'opacity-70' : ''
                )}
              >
                <button
                  onClick={handleToggleFeedbackPanel} // Drawer 열기
                  className="mr-1 rounded-full p-2 text-gray-400 transition-colors hover:text-purple-500 md:hidden" // 모바일에서만 보임
                  title="View Feedback History"
                >
                  <ListChecks size={18} /> {/* 예시 아이콘 */}
                </button>
                <textarea
                  rows="1"
                  className="flex-grow resize-none bg-transparent p-2 text-sm text-gray-800 placeholder-gray-500 outline-none disabled:opacity-50"
                  placeholder="메시지를 입력하세요..."
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  style={{ maxHeight: '80px', overflowY: 'auto' }}
                  disabled={isSending || isRecording}
                />

                {/* --- 새로운 질문하기 버튼 --- */}
                <button
                  onClick={() => setIsAskingHelper(true)}
                  className="mx-1 rounded-full p-2 text-gray-400 transition-colors hover:text-blue-500 disabled:opacity-30"
                  disabled={isSending || isRecording || isAskingHelper} // 질문 중이거나 다른 작업 중일 때 비활성화
                  title="AI에게 질문하기"
                >
                  <HelpCircle size={18} /> {/* 또는 다른 아이콘 */}
                </button>

                {/* Mic Button */}
                <button
                  onClick={handleToggleRecording}
                  className="mx-1 rounded-full p-2 text-gray-400 transition-colors hover:text-orange-500 disabled:opacity-30"
                  disabled={isSending || isRecording || isAskingHelper}
                >
                  {' '}
                  <Mic size={18} />{' '}
                </button>
                {/* Send / Cancel Button */}
                {isSending ? (
                  <button
                    onClick={handleCancelSending}
                    className="flex flex-shrink-0 transform items-center justify-center rounded-lg bg-gray-400 px-3 py-2 text-xs font-bold text-white shadow transition duration-300 ease-in-out hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
                    aria-label="Cancel sending"
                  >
                    <X size={14} className="mr-1" /> Cancel
                  </button>
                ) : (
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isSending || isRecording}
                    className={`flex h-[44px] w-[44px] flex-shrink-0 transform items-center justify-center rounded-lg text-sm font-bold shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 ${
                      inputValue.trim() && !isSending
                        ? 'bg-primary text-white hover:scale-[1.03] hover:bg-primary/90 hover:shadow-lg'
                        : 'cursor-not-allowed bg-gray-300 text-gray-500 opacity-70'
                    }`}
                    aria-label="Send message"
                  >
                    <ArrowUp size={20} /> {/* Changed Send icon */}
                  </button>
                )}
              </div>
            )}
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

export default RoleplayChatPage;
