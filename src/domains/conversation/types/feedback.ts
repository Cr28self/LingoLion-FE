// src/components/FeedbackPanel/Feedback.types.ts

/** Defines the possible severity levels for feedback items. */
export type FeedbackSeverity = 'info' | 'warning' | 'error';

/** Represents a single piece of analysis feedback within an entry. */
export type FeedbackItem = {
  type: string; // e.g., 'grammar', 'expression', 'clarity'
  severity: FeedbackSeverity;
  text: string;
  suggestion: string | null;
};

/** Represents a complete feedback entry tied to a specific message. */
export type FeedbackEntry = {
  feedbackId: string; // Unique identifier for this feedback instance
  messageId: number; // ID of the original message (optional, but potentially useful)
  messageText: string; // The text content of the original message
  feedbackItems: FeedbackItem[]; // Array of analysis items for this message
};
