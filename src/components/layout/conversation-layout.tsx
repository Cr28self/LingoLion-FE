import React from "react";
import { useNavigate } from "react-router-dom";

const ConversationLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen flex-col bg-gradient-to-br from-white to-orange-50 border border-gray-200 rounded-lg shadow-lg overflow-hidden">
      {/* 채팅 헤더 */}
      <header className="flex items-center justify-between bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-4 shadow-md">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-orange-600/30 rounded-full transition-all duration-300 mr-2"
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
            <h1 className="text-xl font-bold">영어 회화 연습</h1>
            <p className="text-xs text-orange-100">LingoLion과 대화하기</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-orange-600/30 rounded-full transition-all">
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
