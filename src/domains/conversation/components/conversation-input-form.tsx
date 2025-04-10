import { cn } from '@/lib/utils';
import {
  ArrowUp,
  HelpCircle,
  ListChecks,
  Loader2,
  Mic,
  Square,
  X,
} from 'lucide-react';
import { MutableRefObject, useRef, useState } from 'react';
import { useSendSSEMessage } from '../../api/send-sse-message';
import { Textarea } from '@/components/ui/textarea';
import useRecordVoice from '../../hooks/use-record-voice';
import { Button } from '@/components/ui/button';

const ConversationQuickHelper = ({ isAskingHelper, setIsAskingHelper }) => {
  const [helperQuestion, setHelperQuestion] = useState('');
  const [helperAnswer, setHelperAnswer] = useState('');
  const [isFetchingHelperAnswer, setIsFetchingHelperAnswer] = useState(false);

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

  const handleCloseHelper = () => {
    setHelperQuestion('');
    setHelperAnswer('');
    setIsAskingHelper(false);
    setIsFetchingHelperAnswer(false);
  };

  const handleApplyAnswerToInput = () => {
    setHelperAnswer('');
    setIsAskingHelper(false);
  };

  return (
    <>
      {isAskingHelper && (
        <div className="absolute bottom-full left-0 right-0 z-20 mb-2 px-3">
          {/* 위치 조정 필요 */}
          <div className="animate-slide-down rounded-lg border border-blue-200 bg-blue-50 p-3 shadow-md">
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
                  <X size={16} />
                </button>
              </div>
            )}
            {isFetchingHelperAnswer && (
              // --- 로딩 상태 ---
              <div className="flex items-center justify-center text-sm text-gray-600">
                <Loader2 size={16} className="mr-2 animate-spin" /> 답변을 생성
                중입니다...
                <button
                  onClick={handleCloseHelper}
                  className="ml-auto p-1 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />{' '}
                </button>
              </div>
            )}
            {helperAnswer && !isFetchingHelperAnswer && (
              // --- 답변 표시 상태 ---
              <div>
                <p className="mb-2 text-sm text-gray-800">{helperAnswer}</p>{' '}
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
    </>
  );
};

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

  // const { conversationId } = useParams();

  // const { conversationId } = useParams();
  // const convId = conversationId as string;

  const conversationId = '18';
  const convId = conversationId as string;

  const { handleSend, isStreaming } = useSendSSEMessage(convId);

  const { handleOnRecord, isActive } = useRecordVoice(convId);

  const handleToggleFeedbackPanel = () => {
    console.log('Feedback panel toggled');
  };

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
            onClick={handleToggleFeedbackPanel} // Drawer 열기
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
