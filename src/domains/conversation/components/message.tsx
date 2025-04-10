// Define a union type for the different message structures
import { Avatar, AvatarImage } from '@/components/ui/avatar.tsx';
import React from 'react';

import { cn } from '@/lib/utils.ts';
import { Sparkles } from 'lucide-react';
import { HistoricalMessage, LiveMessage } from '../types/message.ts';
import {
  TSituationAiRoleField,
  TSituationUserRoleField,
} from '@/types/situation.ts';

type Message = HistoricalMessage | LiveMessage;

type MessageItemProps = {
  message: Message;
  role: TSituationAiRoleField & TSituationUserRoleField;
};

// 🔹 ref를 받을 수 있도록 `forwardRef`로 감싸기
export const AIMessage = React.forwardRef<
  HTMLDivElement,
  { text: string; role: string }
>(({ text, role }, ref) => {
  return (
    <div ref={ref} className="group flex animate-fadeIn items-start gap-3">
      <Avatar className="mt-1 border-2 border-orange-200 p-0.5 shadow-md transition-all duration-300 group-hover:scale-105">
        <AvatarImage src="/lingo-lion-logo.jpeg" />
      </Avatar>
      <div className="flex max-w-[80%] flex-col gap-1">
        <div className="ml-1 text-xs font-medium text-gray-500">{role}</div>
        <div className="relative min-h-[3rem] w-full rounded-2xl rounded-tl-sm border bg-gray-100 px-4 py-3 text-sm text-gray-800 shadow-sm">
          <p className="whitespace-pre-wrap font-medium leading-relaxed">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
});

// 디버깅용 이름 설정
AIMessage.displayName = 'AIMessage';

type UserMessageProps = {
  text: string;
  onMessageClick: () => void;
  isSelected: boolean;
  role: string;
};

export const UserMessage = React.forwardRef<HTMLDivElement, UserMessageProps>(
  ({ text, onMessageClick, isSelected, role }, ref) => {
    const hansFeedback = true;

    return (
      <div ref={ref} className="flex animate-fadeIn flex-col items-end gap-1">
        <div className="mr-1 text-xs font-medium text-gray-500">{role}</div>
        <div
          className={cn(
            'relative w-max max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-sm text-white shadow-md',
            isSelected ? 'scale-[1.02] ring-2 ring-red-400 ring-offset-2' : '',
            hansFeedback ? 'pb-5 pr-5' : '' // 피드백 버튼 공간 확보
          )}
        >
          <div className="font-medium leading-relaxed">{text}</div>

          <button
            onClick={onMessageClick}
            className={cn(
              'absolute right-1 top-1 z-10 rounded-full p-1 text-white/70 transition-all duration-150 hover:bg-white/20 hover:text-white active:scale-90'
            )}
            aria-label="View feedback for this message"
            title="View Feedback"
          >
            <Sparkles size={16} />
          </button>
        </div>
      </div>
    );
  }
);

UserMessage.displayName = 'UserMessage';

// ! 여기서 메시지 박스 렌더링
function ConversationMessageBox(
  { message, role }: MessageItemProps,
  ref: React.Ref<HTMLDivElement>
) {
  // Determine sender type and text content
  const isAssistant =
    'sender' in message
      ? message.sender === 'assistant'
      : message.role === 'assistant';
  const text = message.content;

  const { aiRole, userRole } = role;

  if (isAssistant) {
    return <AIMessage ref={ref} text={text} role={aiRole} />;
  } else {
    return (
      <UserMessage
        ref={ref}
        role={userRole}
        text={text}
        onMessageClick={() => {}}
        isSelected={false}
      />
    );
  }
}

export default React.forwardRef(ConversationMessageBox);
