import React, { useState } from 'react';
import { Loader2, X } from 'lucide-react';

interface ConversationQuickHelperProps {
  isAskingHelper: boolean;
  setIsAskingHelper: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ConversationQuickHelper = ({
  isAskingHelper,
  setIsAskingHelper,
}: ConversationQuickHelperProps) => {
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
                  <X size={16} />
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
