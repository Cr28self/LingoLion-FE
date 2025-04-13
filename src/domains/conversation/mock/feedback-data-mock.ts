import { FeedbackEntry } from '../types/feedback';

export const mockFeedbackEntries: FeedbackEntry[] = [
  {
    feedbackId: 'fb1',
    messageId: 2,
    messageText: 'I usually enjoy black coffee.',
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
  {
    feedbackId: 'fb2',
    messageId: 4,
    messageText: 'oh really?',
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
  {
    feedbackId: 'fb3',
    messageId: 6,
    messageText: 'i wanna hot coffee',
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
  {
    feedbackId: 'fb4',
    messageId: 8,
    messageText: 'i wanna hot latte',
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
];
