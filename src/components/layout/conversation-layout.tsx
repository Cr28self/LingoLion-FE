import useResizePanel from "@/domains/conversation/hooks/use-resize-panel";
import React from "react";

type ConversationLayoutProps = {
  children: React.ReactNode;
  title: string;
  onExitConversation: () => void;
};

const ConversationLayout = ({
  title,
  children,
  onExitConversation,
}: ConversationLayoutProps) => {
  const { MainPanelRef, ResizableContainerRef, ResizeHandleRef, SidePanelRef } =
    useResizePanel();
  return (
    <div className="flex h-dvh w-full" ref={ResizableContainerRef}>
      <div
        className="flex flex-col  bg-gradient-to-br from-white to-orange-50 border border-gray-200 rounded-lg shadow-lg "
        style={{ flexBasis: "70%" }}
        ref={MainPanelRef}
      >
        {/* 채팅 헤더 */}
        <header className="flex items-center justify-between bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 text-white px-6 py-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center relative z-10">
            <button
              onClick={onExitConversation}
              className="p-2.5 hover:bg-white/20 rounded-full transition-all duration-300 mr-3 hover:scale-110"
            >
              <svg
                className="w-5 h-5"
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
              <h1 className="text-2xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-100 ">
                {title}
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-2 relative z-10">
            <button className="p-2.5 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-180">
              <svg
                className="w-5 h-5"
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
        {children}
      </div>

      {/* resize-handler */}
      <div
        className="w-1 bg-gray-400 cursor-col-resize hover:bg-gray-500 flex-shrink-0"
        ref={ResizeHandleRef}
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-px h-6 bg-gray-600"></div>
        </div>
      </div>
      <div
        className="flex flex-col flex-1 bg-gradient-to-br from-white to-orange-50 border border-gray-200 rounded-lg shadow-lg"
        ref={SidePanelRef}
      >
        {/* 채팅 헤더 */}
        <header className="flex items-center justify-between bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 text-white px-6 py-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center relative z-10">
            <button
              onClick={onExitConversation}
              className="p-2.5 hover:bg-white/20 rounded-full transition-all duration-300 mr-3 hover:scale-110"
            >
              <svg
                className="w-5 h-5"
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
              <h1 className="text-2xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-100 ">
                {title}
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-2 relative z-10">
            <button className="p-2.5 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-180">
              <svg
                className="w-5 h-5"
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
        This is Sidebar
      </div>
    </div>
  );
};

export default ConversationLayout;
