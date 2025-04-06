import { useAuthStore } from '@/lib/auth/use-auth-store';
import { useState } from 'react';

import { useLiveMessagesStore } from '../store/use-live-messages-store';
import usePlayVoice from '@/domains/conversation/hooks/use-play-voice.tsx';
import { baseURL } from '@/lib/api-client';

async function fetchSSEStream({
  url,
  body,
  headers,
  onMessage,
  onDone,
}: {
  url: string;
  body: object;
  headers: Record<string, string>;
  onMessage: (chunk: string) => void;
  onDone?: () => void;
}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'text/event-stream',
      ...headers,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`서버 에러: ${response.status}`);
  }

  const reader = response.body?.getReader();
  const decoder = new TextDecoder('utf-8');

  let done = false;
  let buffer = '';

  while (!done) {
    const { value, done: doneReading } = await reader!.read();
    done = doneReading;

    if (value) {
      buffer += decoder.decode(value, { stream: !doneReading });
      const lines = buffer.split('\n');

      for (let i = 0; i < lines.length - 1; i++) {
        const line = lines[i].trim();
        if (line.startsWith('data: ')) {
          const jsonStr = line.replace(/^data:\s*/, '');
          if (jsonStr === '[DONE]') {
            continue;
          }
          onMessage(jsonStr);
        }
      }

      buffer = lines[lines.length - 1]; // 아직 안 끝난 덩어리 유지
    }
  }

  onDone?.();
}

export const useSendSSEMessage = (convId: string) => {
  const { getAccessToken } = useAuthStore();

  const addUserLiveMessage = useLiveMessagesStore(
    (state) => state.addUserLiveMessage
  );
  const realtimeAddLiveMessage = useLiveMessagesStore(
    (state) => state.realtimeAddLiveMessage
  );

  const { triggerSpeak } = usePlayVoice();

  // 스트림 연결 중 여부 (UI 제어용)
  const [isStreaming, setIsStreaming] = useState(false);

  const handleSend = async (submitInput: string) => {
    if (!submitInput.trim()) return;

    // 메시지 순서 관리용
    const { liveMessages } = useLiveMessagesStore.getState();
    let orderNumber = liveMessages.length;

    addUserLiveMessage(submitInput, orderNumber++);
    setIsStreaming(true);

    const receiveOrder = orderNumber;

    try {
      await fetchSSEStream({
        url: `${baseURL}/conversations/${convId}/message/stream`,
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: {
          role: 'user',
          content: submitInput,
        },
        onMessage: (jsonStr) => {
          try {
            const parsed: { content?: string } = JSON.parse(jsonStr);
            if (parsed.content) {
              realtimeAddLiveMessage(parsed.content, receiveOrder);
            }
          } catch {
            // Optional: raw text 처리
          }
        },
        onDone: () => {
          // Optional: 전송 완료 처리
          const { liveMessages } = useLiveMessagesStore.getState();
          console.log('NEW liveMessages', liveMessages);

          if (liveMessages[liveMessages.length - 1].role == 'assistant') {
            triggerSpeak(liveMessages[liveMessages.length - 1].content);
          }

          console.log('DDDDDDOOOOOOONNNNNNNNNNNN');
        },
      });
    } catch (err) {
      console.error('SSE 통신 에러:', err);
    } finally {
      setIsStreaming(false);
    }
  };

  return {
    handleSend,

    isStreaming,

    setIsStreaming,
  };
};
