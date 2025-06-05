import { useEffect, useMemo, useRef } from 'react';

import { useLiveMessagesStore } from '../store/use-live-messages-store.ts';
import useGetAllInfiniteMessage from '../api/get-all-message.ts';
import useInfiniteScroll from '@/hooks/use-infinite-scroll.ts';
import { useConvScrollManager } from '../hooks/use-conv-scroll-manager.tsx';
import ConversationMessageBox from './message.tsx';
import { useParams } from 'react-router-dom';
import useGetFeedback from '../api/get-feedback.ts';

const NoMessagePlaceholder = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4 text-center text-gray-500">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
        <svg
          className="h-10 w-10 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </div>
      <p className="font-medium">대화를 시작해보세요!</p>
      <p className="max-w-md text-sm">
        LingoLion과 영어로 대화하며 회화 실력을 향상시킬 수 있습니다.
      </p>
    </div>
  );
};

type ConversationMessageListProps = {
  userRole: string;
  aiRole: string;
};

type TFeedbackData = {
  id: number;
  createdAt: string; // 피드백 생성 시각
  userOriginalSentence: string; // 사용자가 입력한 원문
  aiCorrectedSentence: string; // AI가 제안하는 전체 교정 문장
  detailedFeedback: {
    feedbackType: 'GRAMMAR' | 'VOCABULARY' | 'STYLE';
    // GRAMMAR : 문법 오류
    // VOCABULARY : 어휘 선택 오류
    // STYLE : 표현 스타일 관련 오류( 예 : 어색한 표현, 자연스런 표현, 정중함, 격식/비격식 등 )
    originalExpression?: string; // 피드백 대상이 되는 사용자 표현 (선택 사항)
    suggestedCorrection?: string; // 해당 부분에 대한 수정 제안 (선택 사항)
    explanation: string; // 설명
    examples?: string[]; // 관련된 예문 (선택 사항)
  }[]; // 상세 피드백 항목들 (배열로 구성하여 여러 개의 피드백 포인트를 담을 수 있도록 함)
  overallComment?: string; // 전반적인 요약 또는 격려 메시지
};

const daatta = [
  {
    id: 3, // 고유 ID
    createdAt: '2025-06-01T07:21:20.410Z', // 피드백 생성 시각
    userOriginalSentence: 'I wanna cold latte', // 사용자가 입력한 원문
    aiCorrectedSentence: 'I want a cold latte.', // AI가 제안하는 전체 교정 문장

    // 상세 피드백 항목들 (배열로 구성하여 여러 개의 피드백 포인트를 담을 수 있도록 함)
    detailedFeedback: [
      {
        feedbackType: 'VOCABULARY',
        originalExpression: 'wanna', // 피드백 대상이 되는 사용자 표현 (선택 사항)
        suggestedCorrection: 'want', // 해당 부분에 대한 수정 제안 (선택 사항)
        explanation:
          '"wanna"는 구어체에서는 자주 사용되지만, 문어체나 정중한 상황에서는 "want"로 바꾸는 것이 좋습니다.', // 설명
        examples: [
          // 관련된 예문 (선택 사항)
          'I want a hot coffee.',
          'I want a slice of cake.',
        ],
      },
      {
        feedbackType: 'GRAMMAR',
        originalExpression: 'cold latte', // 'a'가 빠진 부분에 대한 문맥
        suggestedCorrection: 'a cold latte', // 'a'를 포함한 수정
        explanation:
          "'a'를 추가해야 합니다. 'cold latte'는 특정한 음료를 지칭하기 때문에 'a'가 필요해요.",
        examples: [], // 이 경우, 위 예문과 중복되거나 전체 교정 문장으로 충분할 수 있음
      },
    ],

    // 전반적인 요약 또는 격려 메시지
    overallComment:
      '이렇게 말하면 좀 더 자연스러운 영어가 돼요. 다음에 또 시도해 볼까요?',
  },
  {
    id: 2,
    createdAt: '2025-05-26T05:54:17.111Z',
    userOriginalSentence: 'yes please', // 학생이 입력한 문장 (쉼표 없음)
    aiCorrectedSentence: 'Yes, please.', // AI가 제안하는 전체 교정 문장 (대문자 및 쉼표 포함)
    detailedFeedback: [
      {
        feedbackType: 'PUNCTUATION_COMMA',
        originalExpression: 'yes please',
        suggestedCorrection: 'yes, please',
        explanation:
          '하지만 "yes, please"라고 쉼표를 추가해주면 더 자연스럽고 정확한 표현이 돼요. 이런 경우, 쉼표는 두 개념을 구분해 주기 때문에 말이 더 부드러워집니다.',
        examples: ['I would like a coffee, please.'],
      },
      {
        feedbackType: 'STYLE_POLITENESS', // 문법적 오류는 아니지만, 표현/매너에 대한 팁
        explanation:
          '그리고 대화에서 "yes, please"는 요청을 더 정중하게 만드는 데 도움이 되니 꼭 기억해두세요!',
        examples: [],
      },
    ],

    overallComment: null, // 이 경우 명시적인 전체 코멘트가 없을 수도 있음
  },
];

export const ConversationMessageList = ({
  userRole,
  aiRole,
}: ConversationMessageListProps) => {
  const { data: feedbackData } = useGetFeedback();
  console.log('feedbackData', feedbackData);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const pageLimit = 7;

  const { conversationId } = useParams();
  const convId = conversationId as string;

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

  useEffect(() => {
    if (liveMessages.length > 0) {
      chatEndRef.current?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [liveMessages]);

  return (
    <div className="flex-1 space-y-6 overflow-y-auto p-4" ref={rootRef}>
      {/* ... message mapping ... */}

      {/* Loading Indicator at the top */}
      {/* {isFetchingNextPage && (
        <div className="py-2 text-center text-gray-500">
          <SkeletonChatConv />
        </div>
      )} */}

      {/* start of reversedMessages */}
      {flatMessages.length > 0 &&
        flatMessages.map((_, order, arr) => {
          // Target the second message (index 1) for triggering load of older messages

          const index = arr.length - 1 - order;
          const message = arr[index];

          const isTriggerElement = order === 1;
          const elemKey = `${convId}-${message.id}`; // Ensure unique key

          return (
            <ConversationMessageBox
              key={elemKey}
              message={message}
              role={{ userRole, aiRole }}
              // onMessageClick={() => {}}
              // isSelected={false}
              ref={isTriggerElement ? targetRef : null}
            />
          );
        })}

      {/* Placeholder shown only if NO historical AND NO live messages exist after initial load */}
      {flatMessages.length === 0 && liveMessages.length === 0 && (
        <NoMessagePlaceholder />
      )}

      {/* start of Render live messages */}
      {liveMessages.map((message) => {
        const elemKey = `${message.order}-${message.role}`; // Ensure unique

        return (
          <ConversationMessageBox
            message={message}
            role={{ userRole, aiRole }}
            key={elemKey}
            ref={null}
          />
        );
      })}

      <div ref={chatEndRef} className="h-11" />
    </div>
  );
};
