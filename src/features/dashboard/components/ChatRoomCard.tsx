import React from "react";
import { TChatRoomCard } from "../types/types";
import { Link } from "react-router-dom";

const ChatRoomCard = ({ chatId, title, icon, time }: TChatRoomCard) => {
  return (
    <Link to={`/app/c/${chatId}`}>
      <div
        key={title}
        className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      >
        <div className="flex items-start">
          <span className="text-2xl mr-3 text-orange-600">{icon}</span>
          <div>
            <p className="text-gray-800 font-medium">{title}</p>
            <p className="text-xs text-gray-400 mt-1">{time}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ChatRoomCard;
