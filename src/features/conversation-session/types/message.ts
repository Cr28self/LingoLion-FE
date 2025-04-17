export type LiveMessage = {
  role: 'assistant' | 'user'; // Assuming 'user' for SendMsgBox counterpart
  content: string;
  order: number; // Or string, depending on your actual type
  // Add other live message specific props if any
};

export type HistoricalMessage = {
  createdAt: string;
  id: number;
  sender: 'assistant' | 'user';
  content: string;
};
