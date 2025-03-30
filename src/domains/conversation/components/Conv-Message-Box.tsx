// Define a union type for the different message structures
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { HistoricalMessage, LiveMessage } from "../types/message";

type Message = HistoricalMessage | LiveMessage;

type MessageItemProps = {
  message: Message;
};

// 🔹 ref를 받을 수 있도록 `forwardRef`로 감싸기
const ReceiveMsgBox = React.forwardRef<HTMLDivElement, { text: string }>(
  ({ text }, ref) => {
    return (
      <div ref={ref} className="flex items-start gap-3 group animate-fadeIn">
        <Avatar className="mt-1 border-2 border-orange-200 p-0.5 shadow-md transition-all duration-300 group-hover:scale-105">
          <AvatarImage src={"/lingo-lion-logo.jpeg"} />
        </Avatar>
        <div className="flex flex-col gap-1 max-w-[80%]">
          <div className="text-xs text-gray-500 ml-1 font-medium">링고</div>
          <div className="relative w-full  min-h-[3rem] rounded-2xl rounded-tl-sm px-4 py-3 text-sm bg-gradient-to-br from-orange-50 to-orange-100 text-gray-800 shadow-sm border border-orange-200">
            <div className="font-medium leading-relaxed  whitespace-pre-wrap">
              {text}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

// 🔹 ref를 받을 수 있도록 `React.forwardRef`로 감싸기
const SendMsgBox = React.forwardRef<HTMLDivElement, { text: string }>(
  ({ text }, ref) => {
    return (
      <div ref={ref} className="flex flex-col items-end gap-1 animate-fadeIn">
        <div className="text-xs text-gray-500 mr-1 font-medium">나</div>
        <div className="relative w-max max-w-[85%] rounded-2xl rounded-tr-sm px-4 py-3 text-sm bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-md">
          <div className="font-medium leading-relaxed">{text}</div>
          {/* <div className="absolute -right-2 top-[0.85rem] h-4 w-4 bg-gradient-to-br from-orange-500 to-orange-600 transform rotate-[45deg] -translate-y-1/2"></div> */}
        </div>
      </div>
    );
  }
);

// ! 여기서 메시지 박스 렌더링
function ConvMessageBox(
  { message }: MessageItemProps,
  ref: React.Ref<HTMLDivElement>
) {
  // Determine sender type and text content
  const isAssistant =
    "sender" in message
      ? message.sender === "assistant"
      : message.role === "assistant";
  const text = message.content;

  if (isAssistant) {
    return <ReceiveMsgBox ref={ref} text={text} />;
  } else {
    return <SendMsgBox ref={ref} text={text} />;
  }
}

export default React.forwardRef(ConvMessageBox);
