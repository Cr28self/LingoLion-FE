import { cn } from '@/lib/utils';
import { HelpCircle, ListChecks, Loader2, Mic, Square, X } from 'lucide-react';
import React, { useState } from 'react';

export const ConversationInputForm = () => {
  // !Quick Helper
  const [isAskingHelper, setIsAskingHelper] = useState(false);
  const [helperQuestion, setHelperQuestion] = useState('');
  const [helperAnswer, setHelperAnswer] = useState('');
  const [isFetchingHelperAnswer, setIsFetchingHelperAnswer] = useState(false);

  const [inputValue, setInputValue] = useState('');

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
    setInputValue(helperAnswer);
    setHelperAnswer('');
    setIsAskingHelper(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
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
  );
};
