import useResizePanel from '@/domains/conversation/hooks/use-resize-panel';
import { ChevronsRight } from 'lucide-react';
import React from 'react';

type ConversationLayoutProps = {
  title: string;
  chatNodes: React.ReactNode;
  sidebarNodes?: React.ReactNode;
  onExitConversation: () => void;
};

const ConversationLayout = ({
  title,
  chatNodes,
  sidebarNodes,
  onExitConversation,
}: ConversationLayoutProps) => {
  const { MainPanelRef, ResizableContainerRef, ResizeHandleRef, SidePanelRef } =
    useResizePanel();
  return (
    <div className="flex h-dvh w-full" ref={ResizableContainerRef}>
      <div
        className="flex flex-col rounded-lg border border-gray-200 bg-gradient-to-br from-white to-orange-50 shadow-lg"
        style={{ flexBasis: '70%' }}
        ref={MainPanelRef}
      >
        {/* 채팅 헤더 */}
        <header className="relative flex items-center justify-between overflow-hidden bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 px-6 py-5 text-white shadow-lg">
          <div className="relative z-10 flex items-center">
            <button
              onClick={onExitConversation}
              className="mr-3 rounded-full p-2.5 transition-all duration-300 hover:scale-110 hover:bg-white/20"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="flex flex-col">
              <h1 className="bg-gradient-to-r from-white to-orange-100 bg-clip-text text-2xl font-extrabold tracking-wide text-transparent">
                {title}
              </h1>
            </div>
          </div>

          <div className="relative z-10 flex items-center space-x-2">
            <button className="rounded-full p-2.5 transition-all duration-300 hover:rotate-180 hover:scale-110 hover:bg-white/20">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>
        </header>
        {chatNodes}
      </div>

      {/* resize-handler */}
      <div
        className="w-1 flex-shrink-0 cursor-col-resize bg-gray-400 hover:bg-gray-500"
        ref={ResizeHandleRef}
      >
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-6 w-px bg-gray-600"></div>
        </div>
      </div>

      {/* Side-Panel */}
      <div
        className="flex flex-1 flex-col rounded-lg border border-gray-200 bg-gradient-to-br from-white to-orange-50 shadow-lg"
        ref={SidePanelRef}
      >
        {/* 채팅 헤더 */}
        <header className="relative flex items-center justify-between overflow-hidden bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 px-6 py-5 text-white shadow-lg">
          <div className="relative z-10 flex items-center">
            <button
              onClick={() => {}}
              className="mr-3 rounded-full p-2.5 transition-all duration-300 hover:scale-110 hover:bg-white/20"
            >
              <ChevronsRight className="h-5 w-5" />
            </button>
          </div>

          {/* <div className="relative z-10 flex items-center space-x-2">
            <button className="rounded-full p-2.5 transition-all duration-300 hover:rotate-180 hover:scale-110 hover:bg-white/20">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div> */}
        </header>
        {sidebarNodes}
      </div>
    </div>
  );
};

export default ConversationLayout;
