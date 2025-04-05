import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import React, { MutableRefObject, useRef, useState } from 'react';
import { useSendSSEMessage } from '../api/send-sse-message';
import ConversationVoiceRecordButton from '@/domains/conversation/components/conversation-voice-record-button.tsx';
import { useParams } from 'react-router-dom';
import useRecordVoice from '@/domains/conversation/hooks/use-record-voice.tsx';

export default function ConversationInputForm() {
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isComposing, setIsComposing] = useState(false); // 추가된 부분

  const { conversationId } = useParams();
  const convId = conversationId as string;

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleAbort = () => {};

  const { handleSend, isStreaming } = useSendSSEMessage(convId);

  const adjustTextareaHeight = (
    textarea: MutableRefObject<HTMLTextAreaElement>
  ) => {
    textarea.current.style.height = 'auto'; // 높이를 초기화
    textarea.current.style.height = `${textarea.current.scrollHeight}px`; // 스크롤 높이에 맞춰 높이 조정
  };

  const { handleOnRecord, isActive } = useRecordVoice(convId);
  return (
    <form
      id="Input Area"
      className="flex flex-shrink-0 border-t border-gray-200 bg-white p-4 shadow-inner"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSend(inputMessage);
        setInputMessage('');
      }}
    >
      <div className="flex w-full items-center rounded-xl bg-gray-100 px-4 py-2 transition-all duration-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-orange-300">
        <Textarea
          value={inputMessage}
          onChange={(e) => {
            setInputMessage(e.target.value);
            if (textAreaRef.current)
              adjustTextareaHeight(
                textAreaRef as MutableRefObject<HTMLTextAreaElement>
              );
          }}
          placeholder="메시지를 입력하세요..."
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
              e.preventDefault();
              handleSend(inputMessage);
              setInputMessage('');
            }
          }}
          ref={textAreaRef}
          className="max-h-32 flex-1 resize-none border-0 bg-transparent py-2 text-gray-800 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
          style={{ resize: 'none' }}
        />

        <Button
          type="submit"
          disabled={!inputMessage.trim() || isStreaming}
          className={`ml-2 rounded-full p-3 transition-all duration-300 ${
            inputMessage.trim()
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md hover:from-orange-600 hover:to-orange-700'
              : 'bg-gray-200 text-gray-400'
          }`}
        >
          <Send className="h-5 w-5" />
        </Button>

        <ConversationVoiceRecordButton
          onRecord={handleOnRecord}
          onActive={isActive}
        />

        {isStreaming && (
          <button onClick={handleAbort} style={{ marginLeft: '8px' }}>
            중단
          </button>
        )}
      </div>
    </form>
  );
}
