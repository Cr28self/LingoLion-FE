/** Defines the possible severity levels for feedback items. */
export type FeedbackSeverity = 'info' | 'warning' | 'error';

/** Represents a single piece of analysis feedback within an app. */
export type FeedbackItem = {
  type: string; // e.g., 'grammar', 'expression', 'clarity'
  severity: FeedbackSeverity;
  text: string;
  suggestion: string | null;
};

/** Represents a complete feedback app tied to a specific message. */
export type FeedbackEntry = {
  feedbackId: string; // Unique identifier for this feedback instance
  messageId: number; // ID of the original message (optional, but potentially useful)
  messageText: string; // The text content of the original message
  feedbackItems: FeedbackItem[]; // Array of analysis items for this message
};

export type TFeedbackData = {
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

export const daatta = [
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
