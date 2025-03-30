import { useLiveMessagesStore } from "@/domains/conversation/store/use-live-messages-store";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";

type ConversationLayoutProps = {
  children: React.ReactNode;
  title: string;
  convId: string;
};

const ConversationLayout = ({
  title,
  convId,
  children,
}: ConversationLayoutProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const resetLiveMessages = useLiveMessagesStore(
    (state) => state.resetLiveMessages
  );

  function handleExitConversation() {
    navigate("/app/dashboard/conversations");
    resetLiveMessages();

    queryClient.invalidateQueries({
      queryKey: ["getAllMessage", convId],
    });
  }

  return (
    <div className="flex h-screen flex-col bg-gradient-to-br from-white to-orange-50 border border-gray-200 rounded-lg shadow-lg overflow-hidden">
      {/* 채팅 헤더 */}
      <header className="flex items-center justify-between bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 text-white px-6 py-5 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/path/to/pattern.png')] opacity-10"></div>
        <div className="flex items-center relative z-10">
          <button
            onClick={handleExitConversation}
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
            <p className="text-sm text-orange-100 font-medium mt-0.5 tracking-wide flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-ping"></span>
              LingoLion과 대화하기
            </p>
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
  );
};

export default ConversationLayout;
