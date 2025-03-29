// Define a union type for the different message structures

import React from "react";
import { HistoricalMessage, LiveMessage } from "../types/message";
import { ReceiveMsgBox, SendMsgBox } from "./MsgBox";

type Message = HistoricalMessage | LiveMessage;

type MessageItemProps = {
  message: Message;
};

export const ConvMessageBox = React.forwardRef<
  HTMLDivElement,
  MessageItemProps
>(({ message }, ref) => {
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
});
