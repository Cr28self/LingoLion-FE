import { Avatar, AvatarImage } from '@/components/ui/avatar';

import { forwardRef } from 'react';

type AIMessageProps = {
  message: string;
};

export const AIMessage = forwardRef<HTMLDivElement, AIMessageProps>(
  ({ message }, ref) => {
    return (
      <div ref={ref} className="group flex animate-fadeIn items-start gap-3">
        <Avatar className="mt-1 border-2 border-orange-200 p-0.5 shadow-md transition-all duration-300 group-hover:scale-105">
          <AvatarImage src="/lingo-lion-logo.jpeg" />
        </Avatar>
        <div className="flex max-w-[80%] flex-col gap-1">
          <div className="ml-1 text-xs font-medium text-gray-500">
            링고( 바리스타 )
          </div>
          <div className="relative min-h-[3rem] w-full rounded-2xl rounded-tl-sm border bg-gray-100 px-4 py-3 text-sm text-gray-800 shadow-sm">
            <p className="whitespace-pre-wrap font-medium leading-relaxed">
              {message}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

// 디버깅용 이름 설정
AIMessage.displayName = 'AIMessage';
