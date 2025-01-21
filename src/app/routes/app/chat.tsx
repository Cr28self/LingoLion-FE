import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReceiveMsgBox, SendMsgBox } from "@/features/chat/components/MsgBox";
import { Send } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ChatRoute = () => {
  const { chatId } = useParams();
  const [msg, setMsg] = useState("");
  return (
    <div className="min-h-screen ">
      {chatId}

      <ReceiveMsgBox />

      <SendMsgBox />

      <div className="flex">
        <Input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <Button type="submit" disabled={!msg}>
          <Send />
        </Button>
      </div>
    </div>
  );
};

export default ChatRoute;
