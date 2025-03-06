import React from "react";
import { TChatRoomCard } from "../types/types";
import { Link } from "react-router-dom";

const ChatRoomCard = ({ chatId, title, icon, time }: TChatRoomCard) => {
  return (
    <Link to={`/app/c/${chatId}`}>
      <div className="bg-white/60 backdrop-blur-md p-5 rounded-xl border border-white/50 shadow-sm hover:shadow-md hover:bg-white/80 transition-all duration-200 cursor-pointer group">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-orange-100/80 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl mr-4 group-hover:bg-orange-200/80 transition-colors duration-200">
            <span className="text-orange-600">{icon}</span>
          </div>
          <div className="flex-1">
            <h3 className="text-gray-800 font-medium text-lg group-hover:text-orange-600 transition-colors duration-200">
              {title}
            </h3>
            <div className="flex items-center mt-1">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-xs text-gray-400 ml-1">{time}</p>
            </div>
          </div>
          <div className="ml-2">
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ChatRoomCard;
