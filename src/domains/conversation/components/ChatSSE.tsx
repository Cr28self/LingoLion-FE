import { Suspense } from "react";
import ConvInputForm from "./Conv-Input-Form";
import ConvMessageList from "./Conv-Message-List";

const ChatSSE = ({ convId }: { convId: string }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConvMessageList convId={convId} />

      <ConvInputForm convId={convId} />
    </Suspense>
  );
};

export default ChatSSE;
