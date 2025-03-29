import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { forwardRef } from "react";

type MsgBoxProps = {
  text: string;
};

// Define a union type for the different message structures
type HistoricalMessage = {
  sender: "assistant" | "user"; // Assuming 'user' for SendMsgBox counterpart
  content: string;
  createdAt: string; // Or Date, depending on your actual type
  // Add other historical message specific props if any
};

type LiveMessage = {
  role: "assistant" | "user"; // Assuming 'user' for SendMsgBox counterpart
  content: string;
  order: number; // Or string, depending on your actual type
  // Add other live message specific props if any
};

// Use a type guard or check for properties if structures differ more significantly
type Message = HistoricalMessage | LiveMessage;

type MessageItemProps = {
  message: Message;
  // Pass the ref directly using React.Ref<HTMLDivElement>
  // Note: Using forwardRef here would be needed if MessageItem itself needed a ref AND
  // needed to pass one down. Since only the underlying MsgBox needs the ref,
  // we can just pass it as a prop. But since MsgBox uses forwardRef, we
  // can simply assign it to the 'ref' prop of the chosen MsgBox.
};

// We don't strictly need forwardRef here unless MessageItem itself needs to be referenced.
// We are just choosing WHICH component gets the ref passed down.

// 🔹 ref를 받을 수 있도록 `forwardRef`로 감싸기
const ReceiveMsgBox = forwardRef<HTMLDivElement, MsgBoxProps>(
  ({ text }, ref) => {
    return (
      <div ref={ref} className="flex items-start gap-3 group animate-fadeIn">
        <Avatar className="mt-1 border-2 border-orange-200 p-0.5 shadow-md transition-all duration-300 group-hover:scale-105">
          <AvatarImage src={"/lingo-lion-logo.jpeg"} />
        </Avatar>
        <div className="flex flex-col gap-1">
          <div className="text-xs text-gray-500 ml-1 font-medium">링고</div>
          <div className="relative w-full max-w-[85%]  min-h-[3rem] rounded-2xl rounded-tl-sm px-4 py-3 text-sm bg-gradient-to-br from-orange-50 to-orange-100 text-gray-800 shadow-sm border border-orange-200">
            <div className="font-medium leading-relaxed">{text}</div>
            {/* <div className="absolute -left-2 top-[0.85rem] h-4 w-4 bg-gradient-to-br from-orange-50 to-orange-100 border-l border-t border-orange-200 transform rotate-[45deg] -translate-y-1/2"></div> */}
          </div>
        </div>
      </div>
    );
  }
);

// 🔹 ref를 받을 수 있도록 `forwardRef`로 감싸기
const SendMsgBox = forwardRef<HTMLDivElement, MsgBoxProps>(({ text }, ref) => {
  return (
    <div ref={ref} className="flex flex-col items-end gap-1 animate-fadeIn">
      <div className="text-xs text-gray-500 mr-1 font-medium">나</div>
      <div className="relative w-max max-w-[85%] rounded-2xl rounded-tr-sm px-4 py-3 text-sm bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-md">
        <div className="font-medium leading-relaxed">{text}</div>
        {/* <div className="absolute -right-2 top-[0.85rem] h-4 w-4 bg-gradient-to-br from-orange-500 to-orange-600 transform rotate-[45deg] -translate-y-1/2"></div> */}
      </div>
    </div>
  );
});

const ConvMessageBox = ({
  message,
  innerRef,
}: MessageItemProps & { innerRef?: React.Ref<HTMLDivElement> }) => {
  // Determine sender type and text content
  const isAssistant =
    "sender" in message
      ? message.sender === "assistant"
      : message.role === "assistant";
};
