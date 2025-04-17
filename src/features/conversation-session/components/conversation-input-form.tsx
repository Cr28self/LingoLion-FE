import { cn } from '@/lib/utils.ts';
import { ArrowUp, HelpCircle, ListChecks, Mic, Square, X } from 'lucide-react';
import { MutableRefObject, useRef, useState } from 'react';
import { useSendSSEMessage } from '../api/send-sse-message.ts';
import { Textarea } from '@/components/ui/textarea.tsx';
import useRecordVoice from '../hooks/use-record-voice.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useParams } from 'react-router-dom';
import { useConversationUIStore } from '../store/use-conversation-ui-store.ts';
import { ConversationQuickHelper } from '@/features/conversation-session/components/conversation-quick-helper.tsx';

export const ConversationInputForm = () => {
  // !Quick Helper
  const [isAskingHelper, setIsAskingHelper] = useState(false);

  const [inputValue, setInputValue] = useState('');

  const [isComposing, setIsComposing] = useState(false); // 추가된 부분

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustTextareaHeight = (
    textarea: MutableRefObject<HTMLTextAreaElement>
  ) => {
    textarea.current.style.height = 'auto'; // 높이를 초기화
    textarea.current.style.height = `${textarea.current.scrollHeight}px`; // 스크롤 높이에 맞춰 높이 조정
  };

  const { conversationId } = useParams();
  const convId = conversationId as string;

  const { handleSend, isStreaming } = useSendSSEMessage(convId);

  const { handleOnRecord, isActive } = useRecordVoice(convId);

  const toggleFeedbackPanel = useConversationUIStore(
    (state) => state.toggleFeedbackPanel
  );

  const handleCancelSending = () => {};

  return (
    <>
      {/* --- 질문 UI 컨테이너 (isAskingHelper가 true일 때 표시) --- */}

      <ConversationQuickHelper
        isAskingHelper={isAskingHelper}
        setIsAskingHelper={setIsAskingHelper}
      />
      {isActive ? (
        // --- Voice Recording UI ---
        <div className="flex h-[66px] items-center justify-center rounded-xl border border-red-200 bg-gradient-to-r from-orange-100 to-red-100 p-4 shadow-inner">
          {/* Optional: Add a visualizer or recording indicator */}
          <span className="mr-4 text-sm text-red-700">Recording...</span>
          <button
            onClick={handleOnRecord}
            className="flex transform items-center justify-center rounded-full bg-red-500 p-3 text-white shadow-lg transition hover:scale-105 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
            aria-label="Stop recording"
          >
            <Square size={20} fill="white" />
          </button>
        </div>
      ) : (
        // --- Text Input UI ---
        <form
          className={cn(
            'flex items-center rounded-xl border border-gray-300 bg-white px-2 py-1 shadow-sm transition-all focus-within:border-transparent focus-within:ring-2 focus-within:ring-orange-400',
            isStreaming ? 'opacity-70' : ''
          )}
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            handleSend(inputValue);
            setInputValue('');
          }}
        >
          <Button
            type="button"
            variant={'link'}
            onClick={() => toggleFeedbackPanel()} // Drawer 열기
            className="mr-1 rounded-full p-2 text-gray-400 transition-colors hover:text-purple-500 md:hidden" // 모바일에서만 보임
            title="View Feedback History"
          >
            <ListChecks size={18} /> {/* 예시 아이콘 */}
          </Button>

          <Textarea
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (textAreaRef.current)
                adjustTextareaHeight(
                  textAreaRef as MutableRefObject<HTMLTextAreaElement>
                );
            }}
            disabled={isStreaming || isActive}
            placeholder="메시지를 입력하세요..."
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
              if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
                e.preventDefault();
                handleSend(inputValue);
                setInputValue('');
              }
            }}
            ref={textAreaRef}
            className="flex-grow resize-none bg-transparent p-2 text-sm text-gray-800 placeholder-gray-500 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 disabled:opacity-50"
            style={{ maxHeight: '80px', overflowY: 'auto' }}
          />

          {/* --- 새로운 질문하기 버튼 --- */}
          <Button
            type="button"
            variant={'link'}
            onClick={() => setIsAskingHelper(true)}
            className="mx-1 rounded-full p-2 text-gray-400 transition-colors hover:text-blue-500 disabled:opacity-30"
            disabled={isStreaming || isActive || isAskingHelper} // 질문 중이거나 다른 작업 중일 때 비활성화
            title="AI에게 질문하기"
          >
            <HelpCircle size={18} /> {/* 또는 다른 아이콘 */}
          </Button>

          {/* Mic Button */}
          <Button
            type="button"
            variant={'link'}
            onClick={handleOnRecord}
            className="mx-1 rounded-full p-2 text-gray-400 transition-colors hover:text-orange-500 disabled:opacity-30"
            disabled={isStreaming || isActive || isAskingHelper}
          >
            <Mic size={18} />
          </Button>
          {/* Send / Cancel Button */}
          {isStreaming ? (
            <Button
              type="button"
              onClick={handleCancelSending}
              className="flex flex-shrink-0 transform items-center justify-center rounded-lg bg-gray-400 px-3 py-2 text-xs font-bold text-white shadow transition duration-300 ease-in-out hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
              aria-label="Cancel sending"
            >
              <X size={14} className="mr-1" /> Cancel
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={!inputValue.trim() || isStreaming || isActive}
              className={`flex h-[44px] w-[44px] flex-shrink-0 transform items-center justify-center rounded-lg text-sm font-bold shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 ${
                inputValue.trim() && !isStreaming
                  ? 'bg-primary text-white hover:scale-[1.03] hover:bg-primary/90 hover:shadow-lg'
                  : 'cursor-not-allowed bg-gray-300 text-gray-500 opacity-70'
              }`}
              aria-label="Send message"
            >
              <ArrowUp size={20} /> {/* Changed Send icon */}
            </Button>
          )}
        </form>
      )}
    </>
  );
};
